import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { SurveyList } from "@/presentation/pages";
import { LoadSurveyListSpy } from "@/domain/test";
import { UnexpectedError } from "@/domain/errors";
import { ApiContext } from "@/presentation/contexts";

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn() }}>
        <Router history={createMemoryHistory()}>
          <SurveyList loadSurveyList={loadSurveyListSpy} />
        </Router>
      </ApiContext.Provider>
  );

  return {
    loadSurveyListSpy,
  };
};

describe('SurveyList Component', () => {
  test('Should present 4 empty li on start', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
    await waitFor(() => {
      expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    });
  });

  test('Should call LoadSurveyList on start', async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole("heading"));
  });

  test('Should render SurveyItems on success', async () => {
    const { loadSurveyListSpy } = makeSut();
    const surveyList = screen.getByTestId('survey-list');
    
    await waitFor(() =>
      expect(surveyList.querySelectorAll('li.surveyItemWrap'))
        .toHaveLength(loadSurveyListSpy.surveys.length)
    );
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });

  test('Should presents error on LoadSurveyList fails', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, "loadAll").mockRejectedValueOnce(error);
    makeSut(loadSurveyListSpy);
    await waitFor(() => {
      expect(screen.queryByTestId("survey-list")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("error")).toHaveTextContent(error.message);
  });

  test('Should call LoadSurveyList on click in reload button', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, "loadAll").mockRejectedValueOnce(new UnexpectedError());
    makeSut(loadSurveyListSpy);
    await waitFor(() => {
      expect(screen.queryByTestId("survey-list")).not.toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("reload-button"));
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => {
      expect(screen.queryByTestId("survey-list")).toBeInTheDocument();
    });
  });
});
