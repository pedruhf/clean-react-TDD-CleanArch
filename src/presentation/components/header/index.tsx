import React, { memo } from "react";
import { Logo } from "@/presentation/components";
import styles from "./styles.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.headerWrap}>
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.logoutWrap}>
            <span>Pedro Freitas</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>
  );
};

export default memo(Header);
