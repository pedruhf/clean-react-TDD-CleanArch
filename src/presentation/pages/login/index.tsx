import React from "react";
import Spinner from "@/presentation/components/spinner";
import Logo from "@/presentation/components/logo";
import { GoPrimitiveDot } from "react-icons/go";
import styles from "./styles.scss";

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <header className={styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para programadores</h1>
      </header>
      <form className={styles.form}>
        <h2>Login</h2>
        <div className={styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <GoPrimitiveDot />
        </div>
        <div className={styles.inputWrap}>
          <input type="password" name="password" placeholder="Digite seu senha" />
          <GoPrimitiveDot />
        </div>
        <button type="submit" className={styles.submitButton}>Entrar</button>
        <span className={styles.createAccountLink}>Criar uma conta</span>
        <div className={styles.errorWrap}>
          <Spinner className={styles.spinner} />
          <span className={styles.error}>Error</span>
        </div>
      </form>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Login;