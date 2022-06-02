import React from "react";
import Spinner from "@/presentation/components/spinner";
import Header from "@/presentation/components/login-header";
import Footer from "@/presentation/components/footer";
import Input from "@/presentation/components/input";
import { GoPrimitiveDot } from "react-icons/go";
import styles from "./styles.scss";

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <Header />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite seu senha" />
        <button type="submit" className={styles.submitButton}>Entrar</button>
        <span className={styles.createAccountLink}>Criar uma conta</span>
        <div className={styles.errorWrap}>
          <Spinner className={styles.spinner} />
          <span className={styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Login;