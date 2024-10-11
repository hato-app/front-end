import { useEffect, useState } from "react";
import CardType from "../interfaces/CardType";
import Card from "../components/Card";
import CreateCardWindow from "../components/CreateCardWindow";
import { fetchCardByCategoryId } from "../api/card";
import { useAppContext } from "../AppContextConst";
import HatoSVG from "../components/assets/HatoSVG";

const Index = () => {
  const useAppState = useAppContext();

  const [useCurrentCard, setCurrentCard] = useState<CardType | null>(null);
  const [isCreatingCard, setIsCreatingCard] = useState(false);

  useEffect(() => {
    fetchOneRandomCard();
  }, []);

  const fetchOneRandomCard = async () => {
    const endPoint = import.meta.env.VITE_SERVER + "/cards/random";
    const response: CardType = await (await fetch(endPoint)).json();
    setCurrentCard(response);
  };

  const fetchOneCardByCategory = async (num: number) => {
    const cardByCategoryId = await fetchCardByCategoryId(num);
    setCurrentCard(null);
    setCurrentCard(cardByCategoryId);
  };

  return (
    <section className="index">
      {isCreatingCard && (
        <CreateCardWindow setIsCreatingCard={setIsCreatingCard} />
      )}
      <div className="card-control-buttons">
        {useAppState.user && (
          <button
            onClick={() => setIsCreatingCard(true)}
            className="card-control-buttons__create-button"
          >
            Create another card
          </button>
        )}
        <div className="card-control-buttons__sort-card-options">
          <h2 className="card-control-buttons__sort-card-options__h2">
            What card do you want?
          </h2>
          <div className="card-control-buttons__button-container">
            <button
              onClick={() => fetchOneCardByCategory(1)}
              className="card-control-buttons__jokes-button"
            >
              Jokes
            </button>
            <button
              onClick={() => fetchOneCardByCategory(2)}
              className="card-control-buttons__trivia-button"
            >
              Trivia
            </button>
            <button
              onClick={() => fetchOneCardByCategory(3)}
              className="card-control-buttons__whatever-button"
            >
              Whatever
            </button>
          </div>
        </div>
      </div>
      {useCurrentCard ? (
        <Card card={useCurrentCard} active={true} updateCallBack={() => {}}></Card>
      ) : (
        <div className="loading-svg">
          <HatoSVG></HatoSVG>
        </div>
      )}
    </section>
  );
};

export default Index;
