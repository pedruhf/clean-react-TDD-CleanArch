import React from "react";
import { render, screen } from "@testing-library/react";

import { SurveyItem } from "@/presentation/pages/survey-list/components";
import { mockSurvey } from "@/domain/test";
import { SurveyModel } from "@/domain/models";
import { IconNameOptions } from "@/presentation/components";

type SutTypes = {
  survey: SurveyModel;
};

const makeSut = (): SutTypes => {
  const survey = mockSurvey();
  render(<SurveyItem survey={survey} />);

  return {
    survey,
  };
};

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const { survey } = makeSut();
    survey.didAnswer = false;
    survey.date = new Date("2022-07-24T00:00:00");
    expect(screen.getByTestId("icon")).toHaveProperty("src", IconNameOptions.thumbDown);
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
    expect(screen.getByTestId("day")).toHaveTextContent("24");
    expect(screen.getByTestId("month")).toHaveTextContent("jul");
    expect(screen.getByTestId("year")).toHaveTextContent("2022");
  });
});
