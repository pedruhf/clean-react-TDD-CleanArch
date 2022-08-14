import * as MockHelper from "../utils/helpers";
import * as MockHttpHelper from "../utils/http-mocks";

const path = /surveys/;

const mockUnexpectedError = (): void => {
  MockHttpHelper.mockServerError(path, "GET");
};

const mockSuccess = (): void => {
  MockHttpHelper.mockOk(path, "GET", "fx:survey-result");
};

const mockAccessDeniedError = (): void => {
  MockHttpHelper.mockForbiddenError(path, "GET");
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

  it("Should logout on AccessDeniedError", () => {
    mockAccessDeniedError();
    cy.visit("/surveys/any_id");
    MockHelper.testUrl("/login");
  });

  it("Should present survey result", () => {
    mockSuccess();
    cy.visit("/surveys/any_id");
    cy.getByTestId("question").should("have.text", "Question");
    cy.getByTestId("day").should("have.text", "06");
    cy.getByTestId("month").should("have.text", "ago");
    cy.getByTestId("year").should("have.text", "2022");
    cy.get("li:nth-child(1)").then(li => {
      assert.equal(li.find("[data-testid='answer']").text(), "any_answer");
      assert.equal(li.find("[data-testid='image']").attr("src"), "any_image");
      assert.equal(li.find("[data-testid='percent']").text(), "50%");
    })
    cy.get("li:nth-child(2)").then(li => {
      assert.equal(li.find("[data-testid='answer']").text(), "any_answer_2");
      assert.notExists(li.find("[data-testid='image']"));
      assert.equal(li.find("[data-testid='percent']").text(), "32%");
    })
  });
});
