import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import { SurveyList } from "@/presentation/pages";
import { LoadSurveyList } from "@/domain/usecases";
import { SurveyModel } from "@/domain/models";
import { mockSurveyList } from "@/domain/test";
import { UnexpectedError } from "@/domain/errors";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyList();
  
  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++;
    return Promise.resolve(this.surveys);
  }
}


type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);

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
});
