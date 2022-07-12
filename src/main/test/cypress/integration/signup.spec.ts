import * as MockFormHelper from "../support/form-helper"
import { faker } from "@faker-js/faker";

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

  it("Should present error state if form is invalid", () => {
    cy.getByTestId("name").focus().type(faker.random.alphaNumeric(2));
    MockFormHelper.testInputStatus("name", "O campo name está invalido");

    cy.getByTestId("email").focus().type(faker.random.word());
    MockFormHelper.testInputStatus("email", "O campo email está invalido");

    cy.getByTestId("password").focus().type(faker.random.alphaNumeric(4));
    MockFormHelper.testInputStatus("password", "O campo password está invalido");

    cy.getByTestId("passwordConfirmation").focus().type(faker.random.alphaNumeric(4));
    MockFormHelper.testInputStatus("passwordConfirmation", "O campo passwordConfirmation está invalido");

    cy.getByTestId("submit-button").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });
});