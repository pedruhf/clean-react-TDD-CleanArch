import React from "react";
import SignUp from "./index";
import { ValidationStub } from "@/presentation/test";
import {
  populateField,
  testButtonIsDisable,
  testChildCount,
  testElementExists,
  testElementText,
  testStatusForField
} from "@/presentation/test/form-helper";
import { cleanup, fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { AddAccount, AddAccountParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { EmailInUseError } from "@/domain/errors";

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

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return;
  }
}

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const addAccountSpy = new AddAccountSpy();
  const sut = render(
    <SignUp validation={validationStub} addAccount={addAccountSpy} />
  );

  return {
    sut,
    addAccountSpy,
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
    testStatusForField(sut, "name", "Tudo certo!");
  });

  test('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, "email");
    testStatusForField(sut, "email", "Tudo certo!");
  });

  test('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, "password");
    testStatusForField(sut, "password", "Tudo certo!");
  });

  test('Should show valid passwordConfirmation state if validation succeeds', () => {
    const { sut } = makeSut();
    populateField(sut, "passwordConfirmation");
    testStatusForField(sut, "passwordConfirmation", "Tudo certo!");
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
});