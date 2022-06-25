import React from "react";
import SignUp from "./index";
import { cleanup, render, RenderResult } from "@testing-library/react";
import {
  testButtonIsDisable,
  testChildCount,
  testStatusForField
} from "@/presentation/test/form-helper";

type SutTypes = {
  sut: RenderResult
};

const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp />
  );

  return {
    sut,
  };
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = "Campo obrigatório"
    const { sut } = makeSut();
    testChildCount(sut, "error-wrap", 0);
    testButtonIsDisable(sut, "submit-button", true);
    testStatusForField(sut, "name", validationError);
    testStatusForField(sut, "email", validationError);
    testStatusForField(sut, "password", validationError);
    testStatusForField(sut, "passwordConfirmation", validationError);
  });
});