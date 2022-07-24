import { fireEvent, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";

export const testChildCount = (field: string, count: number): void => {
  const el = screen.getByTestId(field);
  expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisable = (field: string, isDisable: boolean): void => {
  const button = screen.getByTestId(field) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisable);
};

export const testStatusForField = (fieldName: string, validationError: string = ""): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`);
  const field = screen.getByTestId(`${fieldName}`);
  const label = screen.getByTestId(`${fieldName}-label`);
  expect(wrap.getAttribute("data-status")).toBe(validationError ? "invalid" : "valid");
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
};

export const testElementExists = (field: string): void => {
  const el = screen.getByTestId(field);
  expect(el).toBeTruthy();
};

export const testElementText = (field: string, text: string): void => {
  const el = screen.getByTestId(field);
  expect(el.textContent).toBe(text);
};

export const populateField = (field: string, value = faker.random.word() ): void => {
  const input = screen.getByTestId(field);
  fireEvent.input(input, { target: { value } })
};
