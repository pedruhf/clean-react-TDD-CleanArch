import * as MockHelper from "../utils/helpers";
import * as MockHttpHelper from "../utils/http-mocks";

const path = /surveys/;

const mockUnexpectedError = (): void => {
  MockHttpHelper.mockServerError(path, "GET");
};

const mockSuccess = (): void => {
  MockHttpHelper.mockOk(path, "GET", "fx:survey-result");
};

describe("SurveyResult", () => {
  beforeEach(() => {
    cy.fixture("account").then(account => {
      MockHelper.setLocalStorageItem("account", account);
    });
  });

  it("Should present error on UnexpectedError", () => {
    mockUnexpectedError();
    cy.visit("/surveys/any_id");
    cy.getByTestId("error").should("contain.text", "Erro inesperado. Tente novamente em instantes");
  });

  it("Should reload on button click", () => {
    mockUnexpectedError();
    cy.visit("/surveys/any_id");
    cy.getByTestId("error").should("contain.text", "Erro inesperado. Tente novamente em instantes");
    mockSuccess();
    cy.getByTestId("reload-button").click();
    cy.getByTestId("question").should("exist");
  });
});
