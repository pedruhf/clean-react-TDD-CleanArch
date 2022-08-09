import React from "react";
import { render, screen } from "@testing-library/react";

import { SurveyItem } from "@/presentation/pages/survey-list/components";
import { mockSurvey } from "@/domain/test";
import { IconNameOptions } from "@/presentation/components";
import { LoadSurveyList } from "@/domain/usecases";

const makeSut = (survey = mockSurvey()): void => {
  render(<SurveyItem survey={survey} />);
};

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey: LoadSurveyList.Model = Object.assign(mockSurvey(), {
      didAnswer: false,
    });
    makeSut(survey);
    expect(screen.getByTestId("icon")).toHaveProperty("src", IconNameOptions.thumbDown);
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
  });

  test('Should render with correct values', () => {
    const survey: LoadSurveyList.Model = Object.assign(mockSurvey(), {
      didAnswer: true,
    });
    makeSut(survey);
    expect(screen.getByTestId("icon")).toHaveProperty("src", IconNameOptions.thumbUp);
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
  });
});
