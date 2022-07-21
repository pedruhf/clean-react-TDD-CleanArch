import * as MockFormHelper from "../support/form-helper";
import * as MockHttpHelper from "../support/signup-mocks";
import { faker } from "@faker-js/faker";

const populateFields = (): void => {
  cy.getByTestId("name").focus().type(faker.name.findName());
  cy.getByTestId("email").focus().type(faker.internet.email());
  const password = faker.random.alphaNumeric(5);
  cy.getByTestId("password").focus().type(password);
  cy.getByTestId("passwordConfirmation").focus().type(password);
};

const simulateValidSubmit = (): void => {
  populateFields();
  cy.getByTestId("submit-button").click();
};

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

  it("Should present valid state if form is valid", () => {
    cy.getByTestId("name").focus().type(faker.name.findName());
    MockFormHelper.testInputStatus("name");

    cy.getByTestId("email").focus().type(faker.internet.email());
    MockFormHelper.testInputStatus("email");

    const password = faker.random.alphaNumeric(5);
    cy.getByTestId("password").focus().type(password);
    MockFormHelper.testInputStatus("password");

    cy.getByTestId("passwordConfirmation").focus().type(password);
    MockFormHelper.testInputStatus("passwordConfirmation");

    cy.getByTestId("submit-button").should("not.have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("Should present EmailInUseError on 403", () => {
    MockHttpHelper.mockEmailInUseError();
    simulateValidSubmit();
    MockFormHelper.testMainError("Este e-mail já está sendo utilizado");
    MockFormHelper.testUrl("/signup");
  });

  it("Should present UnexpectedError on default error cases", () => {
    MockHttpHelper.mockUnexpectedError();
    simulateValidSubmit();
    MockFormHelper.testMainError("Erro inesperado. Tente novamente em instantes");
    MockFormHelper.testUrl("/signup");
  });

  it("Should present UnexpectedError if invalid data is returned", () => {
    MockHttpHelper.mockInvalidData();
    simulateValidSubmit();
    MockFormHelper.testMainError("Erro inesperado. Tente novamente em instantes");
    MockFormHelper.testUrl("/signup");
  });

  it("Should save account if valid credentials are provided", () => {
    MockHttpHelper.mockOk();
    simulateValidSubmit();
    cy.getByTestId("spinner").should("not.exist");
    cy.getByTestId("main-error").should("not.exist");
    MockFormHelper.testUrl("/");
    MockFormHelper.testLocalStorageItem("account");
  });

  it("Should prevent multiple submits", () => {
    MockHttpHelper.mockOk();
    populateFields();
    cy.getByTestId("submit-button").dblclick();
    MockFormHelper.testHttpCallsCount(1);
  });

  it("Should not call submits if form is invalid", () => {
    MockHttpHelper.mockOk();
    cy.getByTestId("email").focus().type(faker.internet.email()).type("{enter}");
    MockFormHelper.testHttpCallsCount(0);
  });
});