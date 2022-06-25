import { RenderResult } from "@testing-library/react";

export const testChildCount = (sut: RenderResult, field: string, count: number): void => {
  const el = sut.getByTestId(field);
  expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisable = (sut: RenderResult, field: string, isDisable: boolean): void => {
  const button = sut.getByTestId(field) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisable);
};

export const testStatusForField = (sut: RenderResult, field: string, validationError: string): void => {
  const fieldStatus = sut.getByTestId(`${field}-status`);
  expect(fieldStatus.title).toBe(validationError || "Tudo certo!");
};
