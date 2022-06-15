import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from "@/validation/validators";
import { ValidationBuilder as sut } from "@/validation/validators";
import { faker } from "@faker-js/faker";

describe('Validation Builder', () => {
  test('Should has a RequiredFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  test('Should has an EmailValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).email().build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });

  test('Should has a minLengthValidation', () => {
    const fieldName = faker.database.column();
    const minLength = faker.datatype.number();
    const validations = sut.field(fieldName).min(minLength).build();
    expect(validations.length).toBe(1);
    expect(validations).toEqual([new MinLengthValidation(fieldName, minLength)]);
  });

  test('Should return a list of validations', () => {
    const fieldName = faker.database.column();
    const minLength = faker.datatype.number();
    const validations = sut.field(fieldName).required().min(minLength).email().build();
    expect(validations.length).toBe(3);
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, minLength),
      new EmailValidation(fieldName),
    ]);
  });
});
