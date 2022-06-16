import { ValidationBuilder, ValidationComposite } from "@/validation/validators";

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite([
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().min(5).build(),
  ]);
};
