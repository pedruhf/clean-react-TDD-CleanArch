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
    const { sut, } = makeSut({ validationError });
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId("submit-button") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationError);
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationError);
  });
  
  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut, } = makeSut({ validationError });
    populateEmailField(sut);
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut, } = makeSut({ validationError });
    populatePasswordField(sut);
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Tudo certo!");
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Tudo certo!");
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    const submitButton = sut.getByTestId("submit-button") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
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
    const errorWrap = sut.getByTestId("error-wrap");
    // const mainError = sut.getByTestId("main-error");
    // expect(mainError.textContent).toBe(error.message);
    expect(errorWrap.childElementCount).toBe(1);
  });

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();
    await simulateValidSubmit(sut);
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });

  test('Should go to signup page', async () => {
    const { sut } = makeSut();
    const createAccountLink  = sut.getByTestId("create-account-link");
    fireEvent.click(createAccountLink);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/signup");
  });
});
