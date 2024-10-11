import { useEffect, useRef } from "react";
import UserLogin from "../interfaces/UserLoginType";
import { useNavigate } from "react-router-dom";
import * as sessionApi from "../api/session";
import { useAppContext, useAppDispatchContext } from "../AppContextConst";

import "../components/styles/Login.css";

const Register = () => {
	const useAppState = useAppContext();
	const navigate = useNavigate();
	const setAppState = useAppDispatchContext();

	const inputUserNameRef = useRef<HTMLInputElement>(null);
	const inputPasswordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (useAppState.user) navigate("/user");
	}, [useAppState]);

	const handleLogin = async () => {
		const inputUserName = inputUserNameRef.current;
		const inputPassword = inputPasswordRef.current;
		if (inputUserName && inputPassword) {
			const inputUserNameValue = inputUserName.value.trim();
			const inputPasswordValue = inputPassword.value;

			if (inputUserNameValue === "" || inputPasswordValue === "") {
				inputUserName.classList.add("input--error");
				inputPassword.classList.add("input--error");
				return;
			}

			const userLogin: UserLogin = {
				username: inputUserNameValue,
				password: inputPasswordValue,
			};

			const user = await sessionApi.register(userLogin);
			if (user) {
				setAppState({ user });
				navigate("/");
			} else {
				inputUserName.classList.add("input--error");
				inputPassword.classList.add("input--error");
			}
		}
	};

	return (
		<section className="login">
			<div className="input-container">
				<h1 className="login-title">Register</h1>

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
							Register
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Register;
