import * as MockHelper from "../support/helpers";
import * as MockHttpHelper from "../support/survey-list-mocks";
import { faker } from "@faker-js/faker";

describe("SurveyList", () => {
  beforeEach(() => {
    MockHelper.setLocalStorageItem("account", {
      accessToken: faker.datatype.uuid(),
      name: faker.name.findName(),
    });
  });

  it("Should present error on unexpectedError", () => {
    MockHttpHelper.mockUnexpectedError();
    cy.visit("");
    cy.getByTestId("error").should("contain.text", "Erro inesperado. Tente novamente em instantes");
  });

  it("Should logout on AccessDeniedError", () => {
    MockHttpHelper.mockAccessDeniedError();
    cy.visit("");
    MockHelper.testUrl("/login");
  });

  it("Should presents correct username", () => {
    MockHttpHelper.mockUnexpectedError();
    cy.visit("");
    const { name } = MockHelper.getLocalStorageItem("account");
    cy.getByTestId("username").should("contain.text", name);
  });
});
