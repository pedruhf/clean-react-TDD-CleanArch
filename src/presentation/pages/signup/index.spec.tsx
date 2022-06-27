import React from "react";
import SignUp from "./index";
import { ValidationStub } from "@/presentation/test";
import {
  populateField,
  testButtonIsDisable,
  testChildCount,
  testStatusForField
} from "@/presentation/test/form-helper";
import { cleanup, render, RenderResult } from "@testing-library/react";
import { faker } from "@faker-js/faker";

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
    populateField(sut, "name");
    populateField(sut, "email");
    populateField(sut, "password");
    populateField(sut, "passwordConfirmation");
    testButtonIsDisable(sut, "submit-button", false);
  });
});