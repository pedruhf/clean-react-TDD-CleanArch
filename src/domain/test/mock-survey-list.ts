import { SurveyModel } from "@/domain/models";
import { faker } from "@faker-js/faker";

export const mockSurvey = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  answers: [
    {
      answer: faker.random.words(4),
    },
    {
      answer: faker.random.words(5),
      image: faker.internet.url(),
    },
    {
      answer: faker.random.words(6),
    },
  ],
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean(),
});

export const mockSurveyList = (): SurveyModel[] => ([
  mockSurvey(),
  mockSurvey(),
  mockSurvey(),
]);
