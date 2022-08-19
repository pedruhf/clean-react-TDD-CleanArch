import * as MockHelper from "../utils/helpers";
import * as MockHttpHelper from "../utils/http-mocks";

const path = /surveys/;

const mockLoadSuccess = (): void => {
  MockHttpHelper.mockOk(path, "GET", "fx:survey-result");
};

describe("SurveyResult", () => {
  describe("load", () => {
    const mockUnexpectedError = (): void => {
      MockHttpHelper.mockServerError(path, "GET");
    };
    
    const mockAccessDeniedError = (): void => {
      MockHttpHelper.mockForbiddenError(path, "GET");
    };

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
      mockLoadSuccess();
      cy.getByTestId("reload-button").click();
      cy.getByTestId("question").should("exist");
    });
  
    it("Should logout on AccessDeniedError", () => {
      mockAccessDeniedError();
      cy.visit("/surveys/any_id");
      MockHelper.testUrl("/login");
    });
  
    it("Should present survey result", () => {
      mockLoadSuccess();
      cy.visit("/surveys/any_id");
      cy.getByTestId("question").should("have.text", "Question");
      cy.getByTestId("day").should("have.text", "06");
      cy.getByTestId("month").should("have.text", "ago");
      cy.getByTestId("year").should("have.text", "2022");
      cy.get("li:nth-child(1)").then(li => {
        assert.equal(li.find("[data-testid='answer']").text(), "any_answer");
        assert.equal(li.find("[data-testid='image']").attr("src"), "any_image");
        assert.equal(li.find("[data-testid='percent']").text(), "50%");
      });
      cy.get("li:nth-child(2)").then(li => {
        assert.equal(li.find("[data-testid='answer']").text(), "any_answer_2");
        assert.notExists(li.find("[data-testid='image']"));
        assert.equal(li.find("[data-testid='percent']").text(), "32%");
      });
    });
  
    it("Should go to SurveyList on back button click", () => {
      cy.visit("/");
      mockLoadSuccess();
      cy.visit("/surveys/any_id");
      cy.getByTestId("back-button").click();
      MockHelper.testUrl("/");
    });
  });
  
  describe("save", () => {
    const mockUnexpectedError = (): void => {
      MockHttpHelper.mockServerError(path, "PUT");
    };

    const mockAccessDeniedError = (): void => {
      MockHttpHelper.mockForbiddenError(path, "PUT");
    };

    beforeEach(() => {
      cy.fixture("account").then(account => {
        MockHelper.setLocalStorageItem("account", account);
      });

      mockLoadSuccess();
      cy.visit("/surveys/any_id");
    });
  
    it("Should present error on SaveSurveyResult throws an UnexpectedError", () => {
      mockUnexpectedError();
      cy.get("li:nth-child(2)").click();
      cy.getByTestId("error").should("contain.text", "Erro inesperado. Tente novamente em instantes");
    });

    it("Should logout on AccessDeniedError", () => {
      mockAccessDeniedError();
      cy.get("li:nth-child(2)").click();
      MockHelper.testUrl("/login");
    });
  });
});
