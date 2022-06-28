import { FieldValidation } from "@/validation/protocols";
import { CompareFieldValidation, EmailValidation, MinLengthValidation, RequiredFieldValidation } from "@/validation/validators";

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[],
  ) {}

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  min (minLength: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, minLength));
    return this;
  }

  sameAs (fieldToCompare: string): ValidationBuilder {
    this.validations.push(new CompareFieldValidation(this.fieldName, fieldToCompare));
    return this;
  }

  build (): FieldValidation[] {
    return this.validations;
  }
}