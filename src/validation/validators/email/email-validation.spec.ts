import { FieldValidation } from "@/validation/protocols";

class InvalidFieldError extends Error {
  constructor (protected readonly fieldName: string) {
    super(`O campo ${fieldName} está invalido`);
    this.name = "InvalidFieldError";
  }
}

class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate(value: string): Error {
    return new InvalidFieldError(this.field);
  }
}

describe('Email Validation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation("email");
    const error = sut.validate("");
    expect(error).toEqual(new InvalidFieldError("email"));
  });
});
