import React from "react";
import FlipMove from "react-flip-move";

import { Calendar, Footer, Header, Loading } from "@/presentation/components";

import styles from "./styles.scss";

const SurveyResult: React.FC = () => {
  return (
    <div className={styles.surveyResultWrap}>
      <Header />

      <div className={styles.contentWrap}>
        {
          false && 
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
        { false && <Loading />}
      </div>
      
      <Footer />
    </div>
  )
};

export default SurveyResult;