import React from "react";
import { render, screen } from "@testing-library/react";

import { SurveyResult } from "@/presentation/pages";
import { ApiContext } from "@/presentation/contexts";
import { mockAccount } from "@/domain/test";

describe('SurveyResult Component', () => {
  test('Should present correct initial state', () => {
    render(
      <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccount() }}>
        <SurveyResult />
      </ApiContext.Provider>
    );
    const surveyResult = screen.getByTestId("survey-result");
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  })
});
