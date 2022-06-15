import { FieldValidation } from "@/validation/protocols";
import { ValidationComposite } from "./validation-composite";

class FieldValidationSpy implements FieldValidation {
  public error: Error = null;
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return this.error;
  }
}

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy("any_field"),
    new FieldValidationSpy("any_field"),
  ];

  const sut = new ValidationComposite(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy,
  };
};

describe('Validation Composite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut();
    fieldValidationsSpy[0].error = new Error("first_error_message");
    fieldValidationsSpy[1].error = new Error("second_error_message");

    const error = sut.validate("any_field", "any_value");
    expect(error).toBe("first_error_message");
  });

  test('Should return falsy if all validations succeeds', () => {
    const { sut } = makeSut();
    const error = sut.validate("any_field", "any_value");
    expect(error).toBeFalsy();
  });
});
