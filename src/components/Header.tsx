import { useNavigate } from "react-router-dom";
import "./styles/Header.css";
import { useAppContext, useAppDispatchContext } from "../AppContextConst";
import * as sessionApi from "../api/session";
import HatoSVG from "./assets/HatoSVG";

const Header = () => {
  const useAppState = useAppContext();
  const setAppState = useAppDispatchContext();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await sessionApi.logout();
    setAppState({});
    navigate("/");
  };

  return (
		<>
			<section className="header">
				<h1 className="title_header" onClick={() => navigate("/")}>
					<div className="title-header__icon">
						<HatoSVG></HatoSVG>
					</div>
					Hato - delivering random messages
				</h1>
				<div className="header__buttons">
					{!useAppState.user ? (
						<>
							<button
								className="header__buttons__button"
								onClick={() => navigate("/login")}
							>
								Login
							</button>

							<button
								className="header__buttons__button"
								onClick={() => navigate("/register")}
							>
								Register
							</button>
						</>
					) : (
						<div className="user_buttons">
							<button
								className="user_buttons__button"
								onClick={() => navigate("/user")}
							>
								User Page
							</button>
							<button className="user_buttons__button" onClick={handleLogOut}>
								Log Out
							</button>
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Header;
