import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationBuilder } from "@/validation/validators";

describe('Validation Builder', () => {
  test('Should has a RequiredFieldValidation', () => {
    const fieldName = "any_field";
    const validations = ValidationBuilder.field(fieldName).required().build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  test('Should has an EmailValidation', () => {
    const fieldName = "any_field";
    const validations = ValidationBuilder.field(fieldName).email().build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });

  test('Should has a minLengthValidation', () => {
    const fieldName = "any_field";
    const minLength = 5;
    const validations = ValidationBuilder.field(fieldName).min(minLength).build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new MinLengthValidation(fieldName, minLength)]);
  });
});
