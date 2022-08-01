import { faker } from "@faker-js/faker";

import { RemoteLoadSurveyList } from "@/data/usecases";

export const mockRemoveSurvey = (): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.datatype.boolean(),
});

export const mockRemoteSurveyList = (): RemoteLoadSurveyList.Model[] => ([
  mockRemoveSurvey(),
  mockRemoveSurvey(),
  mockRemoveSurvey(),
]);
