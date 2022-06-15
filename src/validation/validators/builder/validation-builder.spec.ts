import { RequiredFieldValidation, ValidationBuilder } from "@/validation/validators";

describe('Validation Builder', () => {
  test('Should has a RequiredFieldValidation', () => {
    const fieldName = "any_field";
    const validations = ValidationBuilder.field(fieldName).required().build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });
});
