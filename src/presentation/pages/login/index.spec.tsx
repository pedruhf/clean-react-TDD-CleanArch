import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";

import { Authentication, AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { InvalidCredentialsError } from "@/domain/errors";
import { mockAccount } from "@/domain/test";
import { Login } from "@/presentation/pages";
import { populateField, testStatusForField } from "@/presentation/test/form-helper";
import { ValidationStub } from "@/presentation/test";
import { ApiContext } from "@/presentation/contexts";

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateField("email", email);
  populateField("password", password);
  const form =  screen.getByTestId("login-form");
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
  authenticationSpy: AuthenticationSpy,
  setCurrentAccountMock: (account: AccountModel) => void;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login']});
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const authenticationSpy = new AuthenticationSpy();
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  );

  return {
    authenticationSpy,
    setCurrentAccountMock,
  };
};

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    expect(screen.getByTestId("error-wrap").children).toHaveLength(0);
    expect(screen.getByTestId("submit-button")).toBeDisabled();
    testStatusForField("email", validationError);
    testStatusForField("password", validationError);
  });
  
  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    populateField("email");
    testStatusForField("email", validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { } = makeSut({ validationError });
    populateField("password");
    testStatusForField("password", validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    makeSut();
    populateField("email");
    testStatusForField("email")
  });

  test('Should show valid password state if Validation succeeds', () => {
    makeSut();
    populateField("password");
    testStatusForField("password");
  });

  test('Should enable submit button if form is valid', () => {
    makeSut();
    populateField("email");
    populateField("password");
    expect(screen.getByTestId("submit-button")).toBeEnabled();
  });

  test('Should show spinner on submit', async () => {
    makeSut();
    await simulateValidSubmit();
    expect(screen.queryByTestId("spinner")).toBeInTheDocument();
  });

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('Should call Authentication only once', async() => {
    const { authenticationSpy } = makeSut();
    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, "auth").mockReturnValueOnce(Promise.reject(error));
    await simulateValidSubmit();
    expect(screen.getByTestId("error-wrap").children).toHaveLength(1);
  });

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit();
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });

  test('Should go to signup page', async () => {
    makeSut();
    const createAccountLink  = screen.getByTestId("create-account-link");
    fireEvent.click(createAccountLink);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/signup");
  });
});
