import { Footer, Logo } from "@/presentation/components";
import React from "react";
import styles from "./styles.scss";

const SurveyList: React.FC = () => {
  return (
    <div className={styles.surveyListWrap}>
      <header className={styles.headerWrap}>
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.logoutWrap}>
            <span>Pedro Freitas</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={styles.surveyContent}>
              <time>
                <span className={styles.day}>19</span>
                <span className={styles.month}>07</span>
                <span className={styles.year}>2022</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={styles.surveyContent}>
              <time>
                <span className={styles.day}>19</span>
                <span className={styles.month}>07</span>
                <span className={styles.year}>2022</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={styles.surveyContent}>
              <time>
                <span className={styles.day}>19</span>
                <span className={styles.month}>07</span>
                <span className={styles.year}>2022</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default SurveyList;