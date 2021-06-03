import React from "react";
import SignForm from "./SignForm";

function Register({ onRegister }) {
  return (
    <SignForm
      title="Регистрация"
      name="register"
      buttonSubmitText="Зарегистрироваться"
      onSubmit={onRegister}
    />
  );
}

export default Register;
