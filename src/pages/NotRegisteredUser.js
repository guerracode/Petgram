import React, { useContext } from "react";
import { Context } from "../Context";
import { UserForm } from "../components/UserForm";
import { useRegisterMutation } from "../hooks/useRegisterMutation";
import { useLoginMutation } from "../hooks/useLoginMutation";

export const NotRegisteredUser = () => {
  const { activateAuth } = useContext(Context);
  return (
    <>
      <Registro activateAuth={activateAuth} />
      <Login activateAuth={activateAuth} />
    </>
  );
};

const Registro = ({ activateAuth }) => {
  const { register, loading, error } = useRegisterMutation();
  const onSubmit = ({ email, password }) => {
    const input = { email, password };
    const variables = { input };
    register({ variables }).then(({ data }) => {
      const { signup } = data;
      activateAuth(signup);
    });
  };

  const errorMsg = error && "El usuario ya existe o hay algun problema.";

  return (
    <UserForm
      onSubmit={onSubmit}
      title="Registrarse"
      error={errorMsg}
      disabled={loading}
    />
  );
};

const Login = ({ activateAuth }) => {
  const { login, loading, error } = useLoginMutation();
  const onSubmit = ({ email, password }) => {
    const input = { email, password };
    const variables = { input };
    login({ variables }).then(({ data }) => {
      const { login } = data;
      activateAuth(login);
    });
  };

  const errorMsg =
    error && "La contraseña no es correcta o el usuario no existe.";

  return (
    <UserForm
      onSubmit={onSubmit}
      title="Iniciar sesión"
      error={errorMsg}
      disabled={loading}
    />
  );
};
