import React from "react";
import { Spinner } from "@/presentation/components";
import styles from "./styles.scss";

const FormStatus: React.FC = () => {
  return (
    <div className={styles.errorWrap}>
      <Spinner className={styles.spinner} />
      <span className={styles.error}>Error</span>
    </div>
  );
};

export default FormStatus;