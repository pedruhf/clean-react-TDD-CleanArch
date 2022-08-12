import React from "react";
import { Link } from "react-router-dom";

import { Calendar, Icon, IconNameOptions } from "@/presentation/components";
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
        <Calendar date={survey.date} className={styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>
        <Link data-testid="link" to={`/surveys/${survey.id}`}>Ver Resultado</Link>
      </footer>
    </li>
  )
};

export default SurveyItem;
