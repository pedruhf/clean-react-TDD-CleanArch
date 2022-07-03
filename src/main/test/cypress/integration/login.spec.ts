describe("Login", () => {
  beforeEach(() => {
    cy.visit("login");
  });

  it("Should load with correct inital state", () => {
    cy.getByTestId("email-status").should("have.attr", "title", "Campo obrigatório");
    cy.getByTestId("password-status").should("have.attr", "title", "Campo obrigatório");
    cy.getByTestId("submit-button").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });
});