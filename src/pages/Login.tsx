import { useRef } from "react";
import UserLogin from "../interfaces/UserLoginType";
import { useNavigate } from "react-router-dom";
import { useAppDispatchContext } from "../AppContext";
import * as sessionApi from "../api/session";

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

      if (inputUserNameValue !== "") {
        if (inputPasswordValue !== "") {
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
      }
    }
  };

  return (
    <section className="login">
      <form>
        <input type="text" id="username" ref={inputUserNameRef} />
        <input type="password" id="password" ref={inputPasswordRef} />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
