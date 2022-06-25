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
    testChildCount(sut, "error-wrap", 0);
    populateField(sut, "name");
    testStatusForField(sut, "name", validationError);
  });
});