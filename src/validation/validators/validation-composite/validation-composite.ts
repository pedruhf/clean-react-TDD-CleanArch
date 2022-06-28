import { Validation } from "@/presentation/protocols/validation";
import { FieldValidation } from "@/validation/protocols";

export class ValidationComposite implements Validation {
  constructor (private readonly validators: FieldValidation[]) {}

  validate(fieldName: string, input: object): string {
    const validators = this.validators.filter(validator => validator.field === fieldName);
    for (const validator of validators) {
      const error = validator.validate(input);
      if (error) {
        return error.message;
      }
    }
  }
}
