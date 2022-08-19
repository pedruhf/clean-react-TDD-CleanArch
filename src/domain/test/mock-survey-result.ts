import { faker } from "@faker-js/faker";

import { LoadSurveyResult, SaveSurveyResult } from "@/domain/usecases";

export const mockSurveyResult = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(5),
      count: faker.datatype.number(),
      percent: faker.datatype.number(),
      isCurrentAccountAnswer: true,
    },
    {
      answer: faker.random.words(5),
      count: faker.datatype.number(),
      percent: faker.datatype.number(),
      isCurrentAccountAnswer: false,
    }
  ]
});

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(5),
});

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0;
  surveyResult = mockSurveyResult();
  
  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++;
    return Promise.resolve(this.surveyResult);
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  params: SaveSurveyResult.Params;
  surveyResult = mockSurveyResult();
  
  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.params = params;
    return Promise.resolve(this.surveyResult);
  }
}
