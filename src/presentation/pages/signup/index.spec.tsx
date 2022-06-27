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
import { cleanup, fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";

const simulateValidSubmit = async (sut: RenderResult, name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateField(sut, "name", name);
  populateField(sut, "email", email);
  populateField(sut, "password", password);
  populateField(sut, "passwordConfirmation", password);
  const form = sut.getByTestId("signup-form");
  fireEvent.submit(form);
  await waitFor(() => form);
};

type SutTypes = {
  sut: RenderResult
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const sut = render(
    <SignUp validation={validationStub} />
  );

  return {
    sut,
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
});