import React from "react";

import { SurveyItem, SurveyItemEmpty } from "@/presentation/pages/survey-list/components";
import { LoadSurveyList } from "@/domain/usecases";

import styles from "./styles.scss";

type ListProps = {
  surveys: LoadSurveyList.Model[]
};

const List: React.FC<ListProps> = ({ surveys }: ListProps) => {
  return (
    <ul className={styles.listWrap} data-testid="survey-list">
      {surveys.length
        ? surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  );
};

export default List;
