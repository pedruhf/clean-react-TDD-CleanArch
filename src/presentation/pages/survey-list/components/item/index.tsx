import React from "react";

import { Icon, IconNameOptions } from "@/presentation/components";
import { LoadSurveyList } from "@/domain/usecases";

import styles from "./styles.scss";

type SurveyItemProps = {
  survey: LoadSurveyList.Model;
};

const SurveyItem: React.FC<SurveyItemProps> = ({ survey }: SurveyItemProps) => {
  const iconName = survey.didAnswer ? IconNameOptions.thumbUp : IconNameOptions.thumbDown;

  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon iconName={iconName} className={styles.iconWrap} />
        <time>
          <span data-testid="day" className={styles.day}>
            {survey.date.getDate().toString().padStart(2, '0')}
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
