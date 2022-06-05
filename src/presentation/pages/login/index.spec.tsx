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
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<Login validation={validationStub} />);

  return {
    sut,
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
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut, } = makeSut({ validationError });
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Tudo certo!");
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Tudo certo!");
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const submitButton = sut.getByTestId("submit-button") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });
});
