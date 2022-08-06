import * as MockHelper from "../support/helpers";

describe("Private Routes", () => {
  it("Should logout if surveyList has no accessToken", () => {
    cy.visit("/");
    MockHelper.testUrl("/login");
  });
});
