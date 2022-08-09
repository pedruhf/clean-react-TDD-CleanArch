import React from "react";
import FlipMove from "react-flip-move";

import { Footer, Header, Spinner } from "@/presentation/components";

import styles from "./styles.scss";

const SurveyResult: React.FC = () => {
  return (
    <div className={styles.surveyResultWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Qual eh seu framework web favorito?</h2>
        <ul className={styles.answersList}>
          <li>
            <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
          <li className={styles.active}>
            <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
          <li>
            <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
        </ul>
        <button>Voltar</button>
        <div className={styles.loadingWrap}>
          <div className={styles.loading}>
            <span>Carregando...</span>
            <Spinner isNegative />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
};

export default SurveyResult;