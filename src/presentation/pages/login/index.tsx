import React from "react";
import { LoginHeader, Footer, FormStatus, Input } from "@/presentation/components";
import styles from "./styles.scss";

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite seu senha" />
        <button type="submit" className={styles.submitButton}>Entrar</button>
        <span className={styles.createAccountLink}>Criar uma conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  );
};

export default Login;