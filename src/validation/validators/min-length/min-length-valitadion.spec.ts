import { MinLengthValidation } from "./min-length-valitadion";
import { InvalidFieldError } from "@/validation/errors";
import { faker } from "@faker-js/faker";

const makeSut = (field: string, minLength: number): MinLengthValidation => {
  return new MinLengthValidation(field, minLength);
};

describe('MinLength Validation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column();
    const minLength = 5;
    const sut = makeSut(field, minLength);
    const error = sut.validate(faker.random.alphaNumeric(minLength - 1));
    expect(error).toEqual(new InvalidFieldError(field))
  });

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column();
    const minLength = 5;
    const sut = makeSut(field, minLength);
    const error = sut.validate(faker.random.alphaNumeric(minLength));
    expect(error).toBeFalsy();
  });
});
