import React, { useContext } from "react";

import { SurveyContext, SurveyItem, SurveyItemEmpty } from "@/presentation/pages/survey-list/components";
import { LoadSurveyList } from "@/domain/usecases";

import styles from "./styles.scss";

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={styles.listWrap} data-testid="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  );
};

export default List;
