import React, { useContext } from "react";
import styles from "./styles.scss";

type ErrorProps = {
  error: string;
  reload: () => void;
};

const Error: React.FC<ErrorProps> = ({ error, reload }: ErrorProps) => {
  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <button data-testid="reload-button" onClick={reload}>Tentar novamente</button>
    </div>
  );
};

export default Error;
