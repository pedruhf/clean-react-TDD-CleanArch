import { FieldValidation } from "@/validation/protocols";
import { ValidationComposite } from "./validation-composite";
import { faker } from "@faker-js/faker";

class FieldValidationSpy implements FieldValidation {
  public error: Error = null;
  constructor (readonly field: string) {}

  validate (input: object): Error {
    return this.error;
  }
}

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string = faker.database.column()): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];

  const sut = new ValidationComposite(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy,
  };
};

describe('Validation Composite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);

    const errorMessage = faker.random.words();
    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(faker.random.words());

    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
    expect(error).toBe(errorMessage);
  });

  test('Should return falsy if all validations succeeds', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);

    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
