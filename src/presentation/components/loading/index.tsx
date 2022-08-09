import React from "react";

import Spinner from "@/presentation/components/spinner";

import styles from "./styles.scss"

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingWrap}>
      <div className={styles.loading}>
        <span>Carregando...</span>
        <Spinner isNegative />
      </div>
    </div>
  );
};

export default Loading;