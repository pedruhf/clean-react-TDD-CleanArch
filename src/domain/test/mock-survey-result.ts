import { faker } from "@faker-js/faker";

import { LoadSurveyResult } from "@/domain/usecases";

export const mockSurveyResult = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(5),
      count: faker.datatype.number(),
      percent: faker.datatype.number(),
      isCurrentAccountAnswer: faker.datatype.boolean(),
    },
    {
      answer: faker.random.words(5),
      count: faker.datatype.number(),
      percent: faker.datatype.number(),
      isCurrentAccountAnswer: faker.datatype.boolean(),
    }
  ]
});

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0;
  surveyResult = mockSurveyResult();
  
  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++;
    return Promise.resolve(this.surveyResult);
  }
}
