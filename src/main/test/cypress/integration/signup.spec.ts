import * as MockFormHelper from "../support/form-helper"

describe("SignUp", () => {
  beforeEach(() => {
    cy.visit("signup");
  });

  it("Should load with correct inital state", () => {
    cy.getByTestId("name").should("have.attr", "readOnly");
    MockFormHelper.testInputStatus("name", "Campo obrigatório");

    cy.getByTestId("email").should("have.attr", "readOnly");
    MockFormHelper.testInputStatus("email", "Campo obrigatório");

    cy.getByTestId("password").should("have.attr", "readOnly");
    MockFormHelper.testInputStatus("password", "Campo obrigatório");

    cy.getByTestId("passwordConfirmation").should("have.attr", "readOnly");
    MockFormHelper.testInputStatus("passwordConfirmation", "Campo obrigatório");

    cy.getByTestId("submit-button").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });
});