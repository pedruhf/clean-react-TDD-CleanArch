import { Footer, Header } from "@/presentation/components";
import React from "react";
import styles from "./styles.scss";

const SurveyList: React.FC = () => {
  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default SurveyList;