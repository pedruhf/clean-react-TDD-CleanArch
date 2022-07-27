import { faker } from "@faker-js/faker";

import { LoadSurveyList } from "@/domain/usecases";

export const mockSurvey = (): LoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean(),
});

export const mockSurveyList = (): LoadSurveyList.Model[] => ([
  mockSurvey(),
  mockSurvey(),
  mockSurvey(),
]);

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyList();
  
  async loadAll (): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return Promise.resolve(this.surveys);
  }
}
