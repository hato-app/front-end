import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./Cards";
import LoggedInOptions from "./LoggedInOptions";
import { Card } from "./interfaces/card.interface";
import { Data } from "./interfaces/data.interface";

const server = import.meta.env.VITE_SERVER;
console.log(server);

function App() {
  const [isFrontOrBack, setIsFrontOrBack] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [data, setData] = useState<Data | null>({
    id: 1,
    user_id: 1,
    category_id: 1,
    front_text: "What do you call a pony with a cough?",
    back_text: "A little horse",
    views: 0,
  });

  useEffect(() => {
    handleGetCard();
  }, []);

  async function handleGetCard(category = 3) {
    // this gets every card
    if (category === 3) {
      const getRandom = `${server}/cards/random`;
      console.log(getRandom);
      const req = await (await fetch(getRandom)).json();
      console.log(req);
      setData(req[0]);
    } else {
      const getAllCategory = `${server}/category/${category}`;
      const dataCategory = await (await fetch(getAllCategory)).json();
      const cards = dataCategory.map((card: []) => {
        return card;
      });
      setData(cards[cards.length * Math.random()]);
    }
  }
  function handleIsFrontOrBack(setCardState?:boolean) {
    if(setCardState === undefined)
    setIsFrontOrBack(!isFrontOrBack);
    else setIsFrontOrBack(setCardState)
  }
  function handleSetDisplayedCard(card: Card | null) {
    setData(card);
  }
  return (
    <>

      {data && (
        <Cards
          data={data}
          server={server}
          setCardOnClick={handleIsFrontOrBack}
          isItFront={isFrontOrBack}
        />
      )}

      <LoggedInOptions
        isLoggedIn={isLoggedIn}
        handleSetDisplayedCard={handleSetDisplayedCard}
        handleIsFrontOrBack={handleIsFrontOrBack}
      />
    </>
  );
}

export default App;
