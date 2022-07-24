import React from "react";

import { Icon, IconNameOptions } from "@/presentation/components";
import styles from "./styles.scss";

const SurveyItem: React.FC = () => {
  return (
    <li className={styles.surveyItemWrap}>
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
  )
};

export default SurveyItem;
