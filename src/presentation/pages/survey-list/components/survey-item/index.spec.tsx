import React from "react";
import { render, screen } from "@testing-library/react";

import { SurveyItem } from "@/presentation/pages/survey-list/components";
import { mockSurvey } from "@/domain/test";
import { IconNameOptions } from "@/presentation/components";
import { SurveyModel } from "@/domain/models";

const makeSut = (survey = mockSurvey()): void => {
  render(<SurveyItem survey={survey} />);
};

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey: SurveyModel = Object.assign(mockSurvey(), {
      didAnswer: false,
      date: new Date("2022-07-24T00:00:00"),
    });
    makeSut(survey);
    expect(screen.getByTestId("icon")).toHaveProperty("src", IconNameOptions.thumbDown);
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
    expect(screen.getByTestId("day")).toHaveTextContent("24");
    expect(screen.getByTestId("month")).toHaveTextContent("jul");
    expect(screen.getByTestId("year")).toHaveTextContent("2022");
  });
});
