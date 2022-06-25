import React from "react";
import { Validation } from "@/presentation/protocols/validation";
import { Authentication, AuthenticationParams, SaveAccessToken } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { InvalidCredentialsError } from "@/domain/errors";
import { Login } from "@/presentation/pages";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render, RenderResult, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { testButtonIsDisable, testChildCount, testStatusForField } from "@/presentation/test/form-helper";

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const form = sut.getByTestId("login-form");
  fireEvent.submit(form);
  await waitFor(() => form);
};

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, { target: { value: password } });
};

const testElementExists = (sut: RenderResult, field: string): void => {
  const el = sut.getByTestId(field);
  expect(el).toBeTruthy();
};

const testElementText = (sut: RenderResult, field: string, text: string): void => {
  const el = sut.getByTestId(field);
  expect(el.textContent).toBe(text);
};

const mockAccount = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});
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

class SaveAccessTokenMock implements SaveAccessToken {
  public accessToken: string;

  async save (accessToken: string): Promise<void> {
    this.accessToken = accessToken;
  }
}

class ValidationStub implements Validation {
  errorMessage: string;

  validate(fieldName: string, fieldValue: string): string {
    return this.errorMessage;
  }
};

type SutTypes = {
  sut: RenderResult,
  authenticationSpy: AuthenticationSpy,
  saveAccessTokenMock: SaveAccessTokenMock
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login']});
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  const sut = render(
  <Router history={history}>
    <Login
      validation={validationStub}
      authentication={authenticationSpy}
      saveAccessToken={saveAccessTokenMock}
    />
  </Router>
  );

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock,
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
    populateEmailField(sut);
    testStatusForField(sut, "email", validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut, } = makeSut({ validationError });
    populatePasswordField(sut);
    testStatusForField(sut, "password", validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    testStatusForField(sut, "email", "Tudo certo!")
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    testStatusForField(sut, "password", "Tudo certo!");
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
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
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();
    await simulateValidSubmit(sut);
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });
  
  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(saveAccessTokenMock, "save").mockReturnValueOnce(Promise.reject(error));
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
