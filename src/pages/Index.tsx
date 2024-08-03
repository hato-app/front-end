import { useEffect, useState } from "react";
import CardType from "../interfaces/CardType";
import Card from "../components/Card";

const Index = () => {
  const [useCurrentCard, setCurrentCard] = useState<CardType | null>(null);

  useEffect(() => {
    fetchOneRandomCard();
  }, []);

  const fetchOneRandomCard = async () => {
    const endPoint = import.meta.env.VITE_SERVER + "/cards/random";
    const response: CardType = await (await fetch(endPoint)).json();
    setCurrentCard(response);
  };

  return (
    <section className="index">
      {useCurrentCard && <Card card={useCurrentCard}></Card>}
    </section>
  );
};

export default Index;
