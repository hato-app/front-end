import "../components/styles/Login.css";
import { useState } from "react";
import { useAppContext, useAppDispatchContext } from "../AppContext";

const Login: React.FC = () => {
  const useAppState = useAppContext();
  const setAppState = useAppDispatchContext();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    setAppState({ ...useAppState, isLoggedIn: true, username });
  };
  
  return (
    <section className="login">
      <h1>Login</h1>
      <div className="login-inputs">
      <label>
      Username:
      <input
        type = "text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter your username"
      />
      </label>
      <label>
      Password:
      <input
        type = "password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter your password"
      />
      </label>
      </div>
      <button onClick={handleLogin}>
        Login
      </button>
    </section>
  );

};
export default Login;
