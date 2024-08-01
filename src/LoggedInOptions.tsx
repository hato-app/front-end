import "./LoggedInOptions.css";
import { useState } from "react";
import { Card } from "./interfaces/card.interface";
interface LoggedInProps {
  isLoggedIn: boolean;
}
const LoggedInOptions: React.FC<LoggedInProps> = ({ isLoggedIn }) => {
  //useStates
  const [cardFront, setCardFront] = useState<string>();
  const [cardBack, setCardBack] = useState<string>();
  //useEffects
  //handleFunctions
  async function createCard() {
    let req: Card[] = await (
      await fetch(import.meta.env.VITE_SERVER + "/cards/1")
    ).json();
    console.log(req);
  }
  return (
    <>
      {isLoggedIn ? (
        <div className="LoggedInOptions">
          {<Comments />}
          <div className="create_">
            <button onClick={createCard}>Create your own card!</button>
            <button>Get another random message!</button>
          </div>
        </div>
      ) : (
        <div className="notLoggedIn">
          <h1>Log in to create, like, comment !</h1>
        </div>
      )}
    </>
  );
};

export default LoggedInOptions;
