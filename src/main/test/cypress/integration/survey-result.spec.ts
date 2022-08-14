import * as MockHelper from "../utils/helpers";
import * as MockHttpHelper from "../utils/http-mocks";

const path = /surveys/;

const mockUnexpectedError = (): void => {
  MockHttpHelper.mockServerError(path, "GET");
};

describe("SurveyResult", () => {
  beforeEach(() => {
    cy.fixture("account").then(account => {
      MockHelper.setLocalStorageItem("account", account);
    });
  });

  it("Should present error on unexpectedError", () => {
    mockUnexpectedError();
    cy.visit("/surveys/any_id");
    cy.getByTestId("error").should("contain.text", "Erro inesperado. Tente novamente em instantes");
  });
});
