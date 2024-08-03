import CardType from "../interfaces/CardType";
import LikesDisLikesButtons from "./LikesDislikesButtons";
import * as cardApi from "../api/card";
import { useEffect, useState } from "react";
import moment from "moment";

interface Props {
  card: CardType;
}

const Card: React.FC<Props> = (props) => {
  const [useViews, setViews] = useState(props.card.views);
  // const [useIsFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    cardApi.updateCard(props.card.id, { views: props.card.views + 1 });
    setViews(props.card.views + 1);

  }, []);

  // const handleCardClick = () => {};

  return (
    <section className="card">
      <div className="card_content">
        <div className="card__content__front">
          <span>{props.card.front_text}</span>
        </div>
        <div className="card__content__back">
          <span>{props.card.back_text}</span>
        </div>
      </div>
      <LikesDisLikesButtons card_id={props.card.id}></LikesDisLikesButtons>
      <div className="card__views">
        <span>Views</span>
        <span>{useViews}</span>
      </div>
      <div className="card__created_at">
        <span>{moment(props.card.created_at).fromNow()}</span>
      </div>
      <div className="card__comments">

      </div>
    </section>
  );
};

export default Card;
