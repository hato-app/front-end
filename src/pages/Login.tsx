import { useRef } from "react";
import UserLogin from "../interfaces/UserLoginType";
import { useNavigate } from "react-router-dom";
import * as sessionApi from "../api/session";
import { useAppDispatchContext } from "../AppContextConst";

import "../components/styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const setAppState = useAppDispatchContext();

  const inputUserNameRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    const inputUserName = inputUserNameRef.current;
    const inputPassword = inputPasswordRef.current;
    if (inputUserName && inputPassword) {
      const inputUserNameValue = inputUserName.value.trim();
      const inputPasswordValue = inputPassword.value;

      if (inputUserNameValue === "") return;

      if (inputPasswordValue === "") return;

      const userLogin: UserLogin = {
        username: inputUserNameValue,
        password: inputPasswordValue,
      };
      
      const user = await sessionApi.login(userLogin);
      if (user) {
        setAppState({ user });
        navigate("/");
      }
    }
  };

  return (
    <section className="login">
      <div className="input-container">
        <h1 className="login-title">Login</h1>

        <form>
          <div className="text-field">
            <input
              type="text"
              placeholder="USERNAME"
              id="username"
              ref={inputUserNameRef}
            />
          </div>
          <div className="password-field">
            <input
              type="password"
              placeholder="PASSWORD"
              id="password"
              ref={inputPasswordRef}
            />
          </div>
          <div className="button-field">
            <button type="button" onClick={handleLogin} className="button">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
