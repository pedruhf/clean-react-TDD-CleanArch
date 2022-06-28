import { InvalidFieldError } from "@/validation/errors";
import { faker } from "@faker-js/faker";
import { CompareFieldValidation } from "./compare-fields-validation";

const makeSut = (
  field: string,
  fieldToCompare: string,
): CompareFieldValidation => {
  return new CompareFieldValidation(field, fieldToCompare);
}

describe('CompareFields Validation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({ [field]: faker.random.word(), [fieldToCompare]: faker.random.word() });
    expect(error).toEqual(new InvalidFieldError(field));
  });

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const value = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({ [field]: value, [fieldToCompare]: value });
    expect(error).toBeFalsy();
  });
});
