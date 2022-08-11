import React, { useState } from "react";
import FlipMove from "react-flip-move";

import { LoadSurveyResult } from "@/domain/usecases";
import { Calendar, Error, Footer, Header, Loading } from "@/presentation/components";

import styles from "./styles.scss";

const SurveyResult: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    error: "",
    surveyResult: null as LoadSurveyResult.Model
  });

  return (
    <div className={styles.surveyResultWrap}>
      <Header />

      <div data-testid="survey-result" className={styles.contentWrap}>
        {
          state.surveyResult && 
            <>
              <hgroup>
                <Calendar date={new Date()} className={styles.calendarWrap} />
                <h2>Qual eh seu framework web favorito?</h2>
              </hgroup>
              <ul className={styles.answersList}>
                <li>
                  <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                  <span className={styles.answer}>ReactJS</span>
                  <span className={styles.percent}>50%</span>
                </li>
              </ul>
              <button>Voltar</button>
            </>
        }
        { state.isLoading && <Loading />}
        { state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      
      <Footer />
    </div>
  )
};

export default SurveyResult;