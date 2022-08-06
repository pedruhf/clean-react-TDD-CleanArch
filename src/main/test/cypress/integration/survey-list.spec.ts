import * as MockHelper from "../utils/helpers";
import * as MockHttpHelper from "../utils/http-mocks";

const path = /surveys/;

const mockUnexpectedError = (): void => {
  MockHttpHelper.mockServerError(path, "GET");
};

const mockAccessDeniedError = (): void => {
  MockHttpHelper.mockForbiddenError(path, "GET");
};

const mockSuccess = (): void => {
  MockHttpHelper.mockOk(path, "GET", "fx:survey-list");
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

  it("Should reload on button click", () => {
    mockUnexpectedError();
    cy.visit("");
    cy.getByTestId("error").should("contain.text", "Erro inesperado. Tente novamente em instantes");
    mockSuccess();
    cy.getByTestId("reload-button").click();
    cy.get("li:not(:empty)").should("have.length", 2);
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

  it("Should present survey items", () => {
    mockSuccess();
    cy.visit("");
    cy.get("li:empty").should("have.length", 4);
    cy.get("li:not(:empty)").should("have.length", 2);
    cy.get("li:nth-child(1)").then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), "06");
      assert.equal(li.find('[data-testid="month"]').text(), "ago");
      assert.equal(li.find('[data-testid="year"]').text(), "2022");
      assert.equal(li.find('[data-testid="question"]').text(), "Question 1");
      cy.fixture("icons").then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr("src"), icon.thumbUp);
      })
    })
    cy.get("li:nth-child(2)").then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), "02");
      assert.equal(li.find('[data-testid="month"]').text(), "fev");
      assert.equal(li.find('[data-testid="year"]').text(), "2022");
      assert.equal(li.find('[data-testid="question"]').text(), "Question 2");
      cy.fixture("icons").then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr("src"), icon.thumbDown);
      })
    })
  });
});
