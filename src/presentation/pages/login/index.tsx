import React, { useState, useEffect } from "react";
import { Authentication, SaveAccessToken } from "@/domain/usecases";
import { LoginHeader, Footer, FormStatus, Input, SubmitButton } from "@/presentation/components";
import { Validation } from "@/presentation/protocols/validation";
import FormContext from "@/presentation/contexts/form/form-context";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles.scss";

type LoginProps = {
  validation: Validation,
  authentication: Authentication,
  saveAccessToken: SaveAccessToken,
};

const Login: React.FC<LoginProps> = ({ validation, authentication, saveAccessToken }: LoginProps) => {
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    mainError: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
  
      setState({ ...state, isLoading: true });
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });

      await saveAccessToken.save(account.accessToken);
      history.replace("/");
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      });
    }
  };

  useEffect(() => {
    const { email, password } = state;
    const formData = { email, password };
    const emailError = validation.validate("name", formData);
    const passwordError = validation.validate("name", formData);
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError,
    });
  }, [state.email, state.password]);

  return (
    <div className={styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="login-form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton text="Entrar" />
          <Link
            to="/signup"
            data-testid="create-account-link"
            className={styles.createAccountLink}
          >
            Criar uma conta
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;