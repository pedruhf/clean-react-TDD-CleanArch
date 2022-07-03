import { faker } from "@faker-js/faker";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("login");
  });

  it("Should load with correct inital state", () => {
    cy.getByTestId("email").should("have.attr", "readOnly");
    cy.getByTestId("email-status").should("have.attr", "title", "Campo obrigatório");

    cy.getByTestId("password").should("have.attr", "readOnly");
    cy.getByTestId("password-status").should("have.attr", "title", "Campo obrigatório");
    
    cy.getByTestId("submit-button").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("Should present error state if form is invalid", () => {
    cy.getByTestId("email").focus().type(faker.random.word());
    cy.getByTestId("email-status").should("have.attr", "title", "O campo email está invalido");
    cy.getByTestId("password").focus().type(faker.random.alphaNumeric(4));
    cy.getByTestId("password-status").should("have.attr", "title", "O campo password está invalido");
    cy.getByTestId("submit-button").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("Should present valid state if form is valid", () => {
    cy.getByTestId("email").focus().type(faker.internet.email());
    cy.getByTestId("email-status").should("have.attr", "title", "Tudo certo!");
    cy.getByTestId("password").focus().type(faker.random.alphaNumeric(5));
    cy.getByTestId("password-status").should("have.attr", "title", "Tudo certo!");
    cy.getByTestId("submit-button").should("not.have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });
});