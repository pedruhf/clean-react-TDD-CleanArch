import React from "react";
import { Router } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";

import SignUp from "./index";
import { ValidationStub } from "@/presentation/test";
import {
  populateField,
  testStatusForField
} from "@/presentation/test/form-helper";
import { AddAccount, AddAccountParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { EmailInUseError } from "@/domain/errors";
import { mockAccount } from "@/domain/test";
import { ApiContext } from "@/presentation/contexts";

const simulateValidSubmit = async (name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateField("name", name);
  populateField("email", email);
  populateField("password", password);
  populateField("passwordConfirmation", password);
  const form = screen.getByTestId("signup-form");
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
  render(
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
    addAccountSpy,
    setCurrentAccountMock,
  };
};

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = "Campo obrigatório"
    makeSut({ validationError });
    expect(screen.getByTestId("error-wrap").children).toHaveLength(0);
    expect(screen.getByTestId("submit-button")).toBeDisabled();
    testStatusForField("name", validationError);
    testStatusForField("email", validationError);
    testStatusForField("password", validationError);
    testStatusForField("passwordConfirmation", validationError);
  });

  test('Should show name error with validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    populateField("name");
    testStatusForField("name", validationError);
  });

  test('Should show email error with validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    populateField("email");
    testStatusForField("email", validationError);
  });

  test('Should show password error with validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    populateField("password");
    testStatusForField("password", validationError);
  });

  test('Should show passwordConfirmation error with validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    populateField("passwordConfirmation");
    testStatusForField("passwordConfirmation", validationError);
  });

  test('Should show valid name state if validation succeeds', () => {
    makeSut();
    populateField("name");
    testStatusForField("name");
  });

  test('Should show valid email state if validation succeeds', () => {
    makeSut();
    populateField("email");
    testStatusForField("email");
  });

  test('Should show valid password state if validation succeeds', () => {
    makeSut();
    populateField("password");
    testStatusForField("password");
  });

  test('Should show valid passwordConfirmation state if validation succeeds', () => {
    makeSut();
    populateField("passwordConfirmation");
    testStatusForField("passwordConfirmation");
  });

  test('Should enable submit button if form is valid', () => {
    makeSut();
    simulateValidSubmit();
    expect(screen.getByTestId("submit-button")).toBeEnabled();
  });

  test('Should show spinner on submit form', () => {
    makeSut();
    simulateValidSubmit();
    expect(screen.queryByTestId("spinner")).toBeInTheDocument();
  });

  test('Should call AddAccount with correct values', () => {
    const { addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(name, email, password);
    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password });
  });

  test('Should call AddAccount only once', () => {
    const { addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(name, email, password);
    simulateValidSubmit(name, email, password);
    expect(addAccountSpy.callsCount).toBe(1);
  });

  test('Should not call AddAccount if form is invalid', () => {
    const validationError = faker.random.words();
    const { addAccountSpy } = makeSut({ validationError });
    simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(0);
  });

  test('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut();
    const error = new EmailInUseError();
    jest.spyOn(addAccountSpy, "add").mockRejectedValueOnce(error);
    await simulateValidSubmit();
    expect(screen.getByTestId("error-wrap").children).toHaveLength(1);
  });

  test('Should call SaveAccessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit();
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });

  test('Should go to login page', async () => {
    makeSut();
    const loginLink = screen.getByTestId("login-link");
    fireEvent.click(loginLink);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/login");
  });
});