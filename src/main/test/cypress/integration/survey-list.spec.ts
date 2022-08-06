import * as MockHelper from "../utils/helpers";
import * as MockHttpHelper from "../utils/http-mocks";

const path = /surveys/;

export const mockUnexpectedError = (): void => {
  MockHttpHelper.mockServerError(path, "GET");
};

export const mockAccessDeniedError = (): void => {
  MockHttpHelper.mockForbiddenError(path, "GET");
};

describe("SurveyList", () => {
  beforeEach(() => {
    cy.fixture("account").then(account => {
      MockHelper.setLocalStorageItem("account", account);
    });
  });

  it("Should present error on unexpectedError", () => {
    mockUnexpectedError();
    cy.visit("");
    cy.getByTestId("error").should("contain.text", "Erro inesperado. Tente novamente em instantes");
  });

  it("Should logout on AccessDeniedError", () => {
    mockAccessDeniedError();
    cy.visit("");
    MockHelper.testUrl("/login");
  });

  it("Should presents correct username", () => {
    mockUnexpectedError();
    cy.visit("");
    const { name } = MockHelper.getLocalStorageItem("account");
    cy.getByTestId("username").should("contain.text", name);
  });

  it("Should logout on logout link click", () => {
    mockUnexpectedError();
    cy.visit("");
    cy.getByTestId("logout").click();
    MockHelper.testUrl("/login");
  });
});
