import { ValidationBuilder, ValidationComposite } from "@/validation/validators";
import { makeSignUpValidation } from "./signup-validation-factory";

describe('SignUpValidation Factory', () => {
  test('Should compose ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation();
    expect(composite).toEqual(new ValidationComposite([
      ...ValidationBuilder.field("name").required().min(3).build(),
      ...ValidationBuilder.field("email").required().email().build(),
      ...ValidationBuilder.field("password").required().min(5).build(),
      ...ValidationBuilder.field("passwordConfirmation").required().sameAs("password").build(),
    ]));
  });
});
