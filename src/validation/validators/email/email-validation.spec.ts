import { InvalidFieldError } from "@/validation/errors";
import { EmailValidation } from "./email-validation";
import { faker } from "@faker-js/faker";

describe('Email Validation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation("email");
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError("email"));
  });

  test('Should return falsy if email is valid', () => {
    const sut = new EmailValidation("email");
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});
