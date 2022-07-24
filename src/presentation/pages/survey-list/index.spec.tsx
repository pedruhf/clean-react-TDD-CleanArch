import React from "react";
import { render, screen } from "@testing-library/react";

import { SurveyList } from "@/presentation/pages";

describe('SurveyList Component', () => {
  test('Should present 4 empty li on start', () => {
    render(<SurveyList />);
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
  });
});
