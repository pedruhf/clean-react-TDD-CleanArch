import React, { useContext } from "react";
import { Spinner } from "@/presentation/components";
import FormContext from "@/presentation/contexts/form/form-context";
import styles from "./styles.scss";

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext);
  const { isLoading, mainError } = state;

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      { isLoading && <Spinner className={styles.spinner} /> }
      { mainError && <span data-testid="main-error" className={styles.error}>{mainError}</span> }
    </div>
  );
};

export default FormStatus;