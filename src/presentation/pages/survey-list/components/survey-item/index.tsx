import React from "react";

import { Icon, IconNameOptions } from "@/presentation/components";
import { SurveyModel } from "@/domain/models";
import styles from "./styles.scss";

type SurveyItemProps = {
  survey: SurveyModel;
};

const SurveyItem: React.FC<SurveyItemProps> = ({ survey }: SurveyItemProps) => {
  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon iconName={IconNameOptions.thumbDown} className={styles.iconWrap} />
        <time>
          <span data-testid="day" className={styles.day}>
            {survey.date.getDate()}
          </span>
          <span data-testid="month" className={styles.month}>
            {survey.date.toLocaleString("pt-BR", { month: "short" }).replace(".", "")}
          </span>
          <span data-testid="year" className={styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
};

export default SurveyItem;
