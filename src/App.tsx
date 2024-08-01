import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./Cards";
import LoggedInOptions from "./LoggedInOptions";

const server = import.meta.env.VITE_SERVER;
console.log(server);

function App() {
  const [isFrontOrBack, setIsFrontOrBack] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [data, setData] = useState({
    id: 1,
    user_id: 1,
    category_id: "jokes",
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
      const getAll = `${server}/cards`;
      const req = await (await fetch(getAll)).json();
      const dataLength: number = req.length;
      const randNum: number = Math.floor(dataLength * Math.random());
      console.log(randNum);

      const getID = `${getAll}/${randNum}`;
      const responseID = await fetch(getID);
      const dataID = await responseID.json();
      setData(dataID);
    } else {
      const getAllCategory = `${server}/category/${category}`;
      const dataCategory = await (await fetch(getAllCategory)).json();
      const cards = dataCategory.map((card: []) => {
        return card;
      });
      setData(cards[cards.length * Math.random()]);
    }
    console.log(data);
  }
  function handleIsFrontOrBack() {
    setIsFrontOrBack(!isFrontOrBack);
  }
  return (
    <>
      <Cards
        data={data}
        setCardOnClick={handleIsFrontOrBack}
        isItFront={isFrontOrBack}
      />

      <LoggedInOptions 
        isLoggedIn={isLoggedIn} 
      />
    </>
  );
}

export default App;
