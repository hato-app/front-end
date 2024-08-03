import { CardUpdateType } from "../interfaces/CardUpdateType";

const endPoint = import.meta.env.VITE_SERVER + "/cards/";

export const updateCard = async (card_id: number, card: CardUpdateType) => {
  return await fetch(endPoint + card_id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ card }),
  });
};

export const fetchCardsByUserId = async (user_id: number) => {
  return await (await fetch(endPoint + "users/" + user_id)).json();
};
