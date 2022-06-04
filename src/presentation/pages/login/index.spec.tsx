import React from "react";
import { Validation } from "@/presentation/protocols/validation";
import Login from "./index";
import { render, RenderResult, fireEvent, cleanup } from "@testing-library/react";
import { faker } from "@faker-js/faker";

class ValidationStub implements Validation {
  errorMessage: string;

  validate(fieldName: string, fieldValue: string): string {
    return this.errorMessage;
  }
};

type SutTypes = {
  sut: RenderResult,
  validationStub: ValidationStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();
  const sut = render(<Login validation={validationStub} />);

  return {
    sut,
    validationStub
  };
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut();
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId("submit-button") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
  });
  
  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationStub.errorMessage);
  });

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
  });
});
