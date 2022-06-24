import { InvalidFieldError } from "@/validation/errors";
import { faker } from "@faker-js/faker";
import { CompareFieldValidation } from "./compare-fields-validation";

const makeSut = (
  field: string = faker.database.column(),
  valueToCompare: string,
): CompareFieldValidation => {
  return new CompareFieldValidation(field, valueToCompare);
}

describe('CompareFields Validation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field, faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError(field));
  });
});
