import React, { useState } from "react";
import { LoginHeader, Footer, FormStatus, Input } from "@/presentation/components";
import FormContext from "@/presentation/contexts/form/form-context";
import styles from "./styles.scss";

type StateProps = {
  isLoading: boolean;
  errorMessage: string;
};

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: "",
  });

  return (
    <div className={styles.login}>
      <LoginHeader />
      <FormContext.Provider value={state}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite seu senha" />
          <button type="submit" className={styles.submitButton}>Entrar</button>
          <span className={styles.createAccountLink}>Criar uma conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;