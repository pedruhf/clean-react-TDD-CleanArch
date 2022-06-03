import React, { useState } from "react";
import { LoginHeader, Footer, FormStatus, Input } from "@/presentation/components";
import FormContext from "@/presentation/contexts/form/form-context";
import styles from "./styles.scss";

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    
  });

  const [errorState] = useState({
    main: "",
    email: "Campo obrigatório",
    password: "Campo obrigatório",
  });

  return (
    <div className={styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, errorState }}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite seu senha" />
          <button data-testid="submit-button" disabled type="submit" className={styles.submitButton}>Entrar</button>
          <span className={styles.createAccountLink}>Criar uma conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;