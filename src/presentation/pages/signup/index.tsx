import React from "react";
import { LoginHeader, Footer, FormStatus, Input } from "@/presentation/components";
import FormContext from "@/presentation/contexts/form/form-context";
import { Link } from "react-router-dom";
import styles from "./styles.scss";

const SignUp: React.FC = () => {
  return (
    <div className={styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state: {} }}>
        <form className={styles.form}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Digite sua senha" />
          <button type="submit" className={styles.submitButton}>Criar</button>
          <Link to="/login" className={styles.loginLink}>Voltar para login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;