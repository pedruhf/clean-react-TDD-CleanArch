import React, { memo } from "react";
import Logo from "@/presentation/components/logo";
import styles from "./styles.scss";

const LoginHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  );
};

export default memo(LoginHeader);
