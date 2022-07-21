import React from "react";
import { Authentication, AuthenticationParams, UpdateCurrentAccount } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { InvalidCredentialsError } from "@/domain/errors";
import { Login } from "@/presentation/pages";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render, RenderResult, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { populateField, testButtonIsDisable, testChildCount, testElementExists, testStatusForField } from "@/presentation/test/form-helper";
import { UpdateCurrentAccountMock, ValidationStub } from "@/presentation/test";
import { mockAccount } from "@/domain/test";

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateField(sut, "email", email);
  populateField(sut, "password", password);
  const form = sut.getByTestId("login-form");
  fireEvent.submit(form);
  await waitFor(() => form);
};


class AuthenticationSpy implements Authentication {
  account = mockAccount();
  callsCount = 0;
  params: AuthenticationParams;

  auth(params: AuthenticationParams): Promise<AccountModel> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.account);
  }
};

type SutTypes = {
  sut: RenderResult,
  authenticationSpy: AuthenticationSpy,
  updateCurrentAccountMock: UpdateCurrentAccountMock
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login']});
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const authenticationSpy = new AuthenticationSpy();
  const updateCurrentAccountMock = new UpdateCurrentAccountMock();
  const sut = render(
  <Router history={history}>
    <Login
      validation={validationStub}
      authentication={authenticationSpy}
      updateCurrentAccount={updateCurrentAccountMock}
    />
  </Router>
  );

  return {
    sut,
    authenticationSpy,
    updateCurrentAccountMock,
  };
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    testChildCount(sut, "error-wrap", 0);
    testButtonIsDisable(sut, "submit-button", true);
    testStatusForField(sut, "email", validationError);
    testStatusForField(sut, "password", validationError);
  });
  
  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut, } = makeSut({ validationError });
    populateField(sut, "email");
    testStatusForField(sut, "email", validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut, } = makeSut({ validationError });
    populateField(sut, "password");
    testStatusForField(sut, "password", validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, "email");
    testStatusForField(sut, "email")
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, "password");
    testStatusForField(sut, "password");
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateField(sut, "email");
    populateField(sut, "password");
    testButtonIsDisable(sut, "submit-button", false);
  });

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    testElementExists(sut, "spinner")
  });

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('Should call Authentication only once', async() => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, "auth").mockReturnValueOnce(Promise.reject(error));
    await simulateValidSubmit(sut);
    testChildCount(sut, "error-wrap", 1);
  });

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, updateCurrentAccountMock } = makeSut();
    await simulateValidSubmit(sut);
    expect(updateCurrentAccountMock.account).toEqual(authenticationSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });
  
  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, updateCurrentAccountMock } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(updateCurrentAccountMock, "save").mockReturnValueOnce(Promise.reject(error));
    await simulateValidSubmit(sut);
    testChildCount(sut, "error-wrap", 1);
  });

  test('Should go to signup page', async () => {
    const { sut } = makeSut();
    const createAccountLink  = sut.getByTestId("create-account-link");
    fireEvent.click(createAccountLink);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/signup");
  });
});
