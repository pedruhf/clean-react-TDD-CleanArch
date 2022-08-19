import React from "react";
import { useHistory } from "react-router-dom";

import { Calendar } from "@/presentation/components";
import { LoadSurveyResult } from "@/domain/usecases";
import { SurveyResultAnswer } from "@/presentation/pages/survey-result/components";

import styles from "./styles.scss";

type ResultProps = {
  surveyResult: LoadSurveyResult.Model;
};

const Result: React.FC<ResultProps> = ({ surveyResult }: ResultProps) => {
  const { goBack } = useHistory();

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <ul data-testid="answers" className={styles.answersList}>
        {surveyResult.answers.map(answer => <SurveyResultAnswer key={answer.answer} answer={answer} /> )}
      </ul>
      <button className={styles.button} data-testid="back-button" onClick={goBack}>Voltar</button>
    </>
  );
};

export default Result;
