import { MinLengthValidation } from "./min-length-valitadion";
import { InvalidFieldError } from "@/validation/errors";
import { faker } from "@faker-js/faker";

describe('MinLength Validation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.random.word();
    const sut = new MinLengthValidation(field, 5);
    const error = sut.validate("123");
    expect(error).toEqual(new InvalidFieldError(field))
  });

  test('Should return falsy if value is valid', () => {
    const field = faker.random.word();
    const sut = new MinLengthValidation(field, 5);
    const error = sut.validate("12345");
    expect(error).toBeFalsy();
  });
});
