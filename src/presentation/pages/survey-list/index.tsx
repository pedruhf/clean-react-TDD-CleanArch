import { Footer, Header, Icon, IconNameOptions } from "@/presentation/components";
import React from "react";
import styles from "./styles.scss";

const SurveyList: React.FC = () => {
  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={styles.surveyContent}>
              <Icon iconName={IconNameOptions.thumbUp} className={styles.iconWrap} />
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
              <Icon iconName={IconNameOptions.thumbUp} className={styles.iconWrap} />
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
              <Icon iconName={IconNameOptions.thumbUp} className={styles.iconWrap} />
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