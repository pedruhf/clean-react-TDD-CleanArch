import React, { useContext } from "react";
import { Spinner } from "@/presentation/components";
import FormContext from "@/presentation/contexts/form/form-context";
import styles from "./styles.scss";

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext);
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      { isLoading && <Spinner className={styles.spinner} /> }
      { errorMessage && <span className={styles.error}>{errorMessage}</span> }
    </div>
  );
};

export default FormStatus;