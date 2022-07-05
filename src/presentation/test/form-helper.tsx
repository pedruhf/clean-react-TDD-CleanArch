import { fireEvent, RenderResult } from "@testing-library/react";
import { faker } from "@faker-js/faker";

export const testChildCount = (sut: RenderResult, field: string, count: number): void => {
  const el = sut.getByTestId(field);
  expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisable = (sut: RenderResult, field: string, isDisable: boolean): void => {
  const button = sut.getByTestId(field) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisable);
};

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError: string = ""): void => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`);
  const field = sut.getByTestId(`${fieldName}`);
  const label = sut.getByTestId(`${fieldName}-label`);
  expect(wrap.getAttribute("data-status")).toBe(validationError ? "invalid" : "valid");
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
};

export const testElementExists = (sut: RenderResult, field: string): void => {
  const el = sut.getByTestId(field);
  expect(el).toBeTruthy();
};

export const testElementText = (sut: RenderResult, field: string, text: string): void => {
  const el = sut.getByTestId(field);
  expect(el.textContent).toBe(text);
};

export const populateField = (sut: RenderResult, field: string, value = faker.random.word() ): void => {
  const input = sut.getByTestId(field);
  fireEvent.input(input, { target: { value } })
};
