import React from "react";
import SignUp from "./index";
import { ValidationStub } from "@/presentation/test";
import {
  populateField,
  testButtonIsDisable,
  testChildCount,
  testElementExists,
  testStatusForField
} from "@/presentation/test/form-helper";
import { AddAccount, AddAccountParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { EmailInUseError } from "@/domain/errors";
import { cleanup, fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { createMemoryHistory } from "history";
import { mockAccount } from "@/domain/test";
import { ApiContext } from "@/presentation/contexts";

const simulateValidSubmit = async (sut: RenderResult, name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateField(sut, "name", name);
  populateField(sut, "email", email);
  populateField(sut, "password", password);
  populateField(sut, "passwordConfirmation", password);
  const form = sut.getByTestId("signup-form");
  fireEvent.submit(form);
  await waitFor(() => form);
};

class AddAccountSpy implements AddAccount {
  public params: AddAccountParams;
  public callsCount: number = 0;
  public account = mockAccount();

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ["/signup"] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const addAccountSpy = new AddAccountSpy();
  const setCurrentAccountMock = jest.fn();
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <SignUp
          validation={validationStub}
          addAccount={addAccountSpy}
        />
      </Router>
    </ApiContext.Provider>
  );

  return {
    sut,
    addAccountSpy,
    setCurrentAccountMock,
  };
};

describe('SignUp Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = "Campo obrigatório"
    const { sut } = makeSut({ validationError });
    testChildCount(sut, "error-wrap", 0);
    testButtonIsDisable(sut, "submit-button", true);
    testStatusForField(sut, "name", validationError);
    testStatusForField(sut, "email", validationError);
    testStatusForField(sut, "password", validationError);
    testStatusForField(sut, "passwordConfirmation", validationError);
  });

  test('Should show name error with validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateField(sut, "name");
    testStatusForField(sut, "name", validationError);
  });

  test('Should show email error with validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateField(sut, "email");
    testStatusForField(sut, "email", validationError);
  });

  test('Should show password error with validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateField(sut, "password");
    testStatusForField(sut, "password", validationError);
  });

  test('Should show passwordConfirmation error with validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateField(sut, "passwordConfirmation");
    testStatusForField(sut, "passwordConfirmation", validationError);
  });

  test('Should show valid name state if validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, "name");
    testStatusForField(sut, "name");
  });

  test('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, "email");
    testStatusForField(sut, "email");
  });

  test('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, "password");
    testStatusForField(sut, "password");
  });

  test('Should show valid passwordConfirmation state if validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, "passwordConfirmation");
    testStatusForField(sut, "passwordConfirmation");
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    testButtonIsDisable(sut, "submit-button", false);
  });

  test('Should show spinner on submit form', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    testElementExists(sut, "spinner")
  });

  test('Should call AddAccount with correct values', () => {
    const { sut, addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, name, email, password);
    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password });
  });

  test('Should call AddAccount only once', () => {
    const { sut, addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, name, email, password);
    simulateValidSubmit(sut, name, email, password);
    expect(addAccountSpy.callsCount).toBe(1);
  });

  test('Should not call AddAccount if form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, addAccountSpy } = makeSut({ validationError });
    simulateValidSubmit(sut);
    expect(addAccountSpy.callsCount).toBe(0);
  });

  test('Should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut();
    const error = new EmailInUseError();
    jest.spyOn(addAccountSpy, "add").mockRejectedValueOnce(error);
    await simulateValidSubmit(sut);
    // testElementText(sut, "main-error", error.message);
    testChildCount(sut, "error-wrap", 1);
  });

  test('Should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit(sut);
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });

  test('Should go to login page', async () => {
    const { sut } = makeSut();
    const loginLink = sut.getByTestId("login-link");
    fireEvent.click(loginLink);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/login");
  });
});