import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import { SurveyResult } from "@/presentation/pages";
import { ApiContext } from "@/presentation/contexts";
import { LoadSurveyResultSpy, mockAccount } from "@/domain/test";

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy();

  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccount() }}>
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </ApiContext.Provider>
  );

  return {
    loadSurveyResultSpy,
  };
};

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    makeSut();
    const surveyResult = screen.getByTestId("survey-result");
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    await waitFor(() => surveyResult);
  });

  test('Should call loadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut();
    await waitFor(() => screen.getByTestId("survey-result"));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });
});
