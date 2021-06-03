import React from "react";
import SignForm from "./SignForm";
import Loader from "./Loader.js";

function Login({ onLogin, isLoading }) {
  return (
    <>
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <SignForm
          title="Вход"
          name="login"
          buttonSubmitText="Войти"
          onSubmit={onLogin}
        />
      )}
    </>
  );
}

export default Login;
