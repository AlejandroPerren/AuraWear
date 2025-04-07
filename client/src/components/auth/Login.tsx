import React from "react";
import { useAppStore } from "../../store/useAppStore";

const Login = () => {
  const { setAuth } = useAppStore();

  return (
    <div>
      <button className="" onClick={setAuth}>
        Aun no tienes una cuenta? Crea Una
      </button>
    </div>
  );
};

export default Login;
