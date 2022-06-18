import { ValidationBuilder, ValidationComposite } from "@/validation/validators";
import { makeLoginValidation } from "./login-validation-factory";

describe('LoginValidation Factory', () => {
  test('Should compose ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(new ValidationComposite([
      ...ValidationBuilder.field("email").required().email().build(),
      ...ValidationBuilder.field("password").required().min(5).build(),
    ]))
  });
});
