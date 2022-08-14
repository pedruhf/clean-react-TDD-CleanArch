import * as MockHelper from "../utils/helpers";

describe("Private Routes", () => {
  it("Should logout if SurveyList has no accessToken", () => {
    cy.visit("/");
    MockHelper.testUrl("/login");
  });

  it("Should logout if SurveyResult has no accessToken", () => {
    cy.visit("/surveys/any_id");
    MockHelper.testUrl("/login");
  });
});
