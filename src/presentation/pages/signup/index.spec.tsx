import React from "react";
import SignUp from "./index";
import { cleanup, render, RenderResult } from "@testing-library/react";

const testChildCount = (sut: RenderResult, field: string, count: number): void => {
  const el = sut.getByTestId(field);
  expect(el.childElementCount).toBe(count);
};

const testButtonIsDisable = (sut: RenderResult, field: string, isDisable: boolean): void => {
  const button = sut.getByTestId(field) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisable);
};

const testStatusForField = (sut: RenderResult, field: string, validationError: string): void => {
  const fieldStatus = sut.getByTestId(`${field}-status`);
  expect(fieldStatus.title).toBe(validationError || "Tudo certo!");
};

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