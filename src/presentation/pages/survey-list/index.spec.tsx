import React from "react";
import { render, screen } from "@testing-library/react";

import { SurveyList } from "@/presentation/pages";
import { LoadSurveyList } from "@/domain/usecases";
import { SurveyModel } from "@/domain/models";


class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  
  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++;
    return Promise.resolve([]);
  }
}


type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);

  return {
    loadSurveyListSpy,
  };
};

describe('SurveyList Component', () => {
  test('Should present 4 empty li on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
  });

  test('Should call LoadSurveyList on start', () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});
