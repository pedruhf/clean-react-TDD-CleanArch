import React from "react";
import { render, screen } from "@testing-library/react";

import { SurveyList } from "@/presentation/pages";

const makeSut = () => {
  render(<SurveyList />);
};

describe('SurveyList Component', () => {
  test('Should present 4 empty li on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
  });
});
