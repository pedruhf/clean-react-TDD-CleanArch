import { CompareFieldValidation, EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators";
import { makeSignUpValidation } from "./signup-validation-factory";

describe('SignUpValidation Factory', () => {
  test('Should compose ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation();
    expect(composite).toEqual(new ValidationComposite([
      new RequiredFieldValidation("name"),
      new MinLengthValidation("name", 3),
      new RequiredFieldValidation("email"),
      new EmailValidation("email"),
      new RequiredFieldValidation("password"),
      new MinLengthValidation("password", 5),
      new RequiredFieldValidation("passwordConfirmation"),
      new CompareFieldValidation("passwordConfirmation", "password"),
    ]));
  });
});
