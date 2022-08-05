import React, { memo, useContext } from "react";

import { Logo } from "@/presentation/components";
import { ApiContext } from "@/presentation/contexts";
import { useLogout } from "@/presentation/hooks";

import styles from "./styles.scss";

const Header: React.FC = () => {
  const handleLogout = useLogout();
  const { getCurrentAccount } = useContext(ApiContext);

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    handleLogout()
  };

  return (
    <header className={styles.headerWrap}>
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.logoutWrap}>
            <span data-testid="username">{getCurrentAccount().name}</span>
            <a data-testid="logout" href="#" onClick={logout}>Sair</a>
          </div>
        </div>
      </header>
  );
};

export default memo(Header);
