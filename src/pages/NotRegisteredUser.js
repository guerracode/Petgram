import React from "react";
import Context from "../Context";
import { UserForm } from "../components/UserForm";
import { useRegisterMutation } from "../hooks/useRegisterMutation";

export const NotRegisteredUser = () => (
  <Context.Consumer>
    {({ activateAuth }) => {
      return (
        <>
          <Registro activateAuth={activateAuth} />
          <UserForm activateAuth={activateAuth} title="Iniciar sesión" />
        </>
      );
    }}
  </Context.Consumer>
);

const Registro = ({ activateAuth }) => {
  const { register } = useRegisterMutation();
  const onSubmit = ({ email, password }) => {
    const input = { email, password };
    const variables = { input };
    register({ variables }).then((res) => {
      activateAuth();
    });
  };
  return <UserForm onSubmit={onSubmit} title="Registrarse" />;
};
