import React, { useEffect, useState } from "react";
import { AddAccount, SaveAccessToken } from "@/domain/usecases";
import { LoginHeader, Footer, FormStatus, Input, SubmitButton } from "@/presentation/components";
import { Validation } from "@/presentation/protocols/validation";
import FormContext from "@/presentation/contexts/form/form-context";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles.scss";

type SignUpProps = {
  validation: Validation;
  addAccount: AddAccount;
  saveAccessToken: SaveAccessToken
};

const SignUp: React.FC<SignUpProps> = ({ validation, addAccount, saveAccessToken }: SignUpProps) => {
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: "",
    nameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    passwordConfirmation: "",
    passwordConfirmationError: "",
    mainError: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState({
        ...state,
        isLoading: true,
      });
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
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
    const { name, email, password, passwordConfirmation } = state;
    const formData = { name, email, password, passwordConfirmation };
    const nameError = validation.validate("name", formData);
    const emailError = validation.validate("name", formData);
    const passwordError = validation.validate("name", formData);
    const passwordConfirmationError = validation.validate("name", formData);
    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError  || !!passwordError || !!passwordConfirmationError,
    });
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  return (
    <div className={styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="signup-form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Digite sua senha" />
          <SubmitButton text="Cadastrar" />
          <Link to="/login" replace data-testid="login-link" className={styles.loginLink}>Voltar para login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;