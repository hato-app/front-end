import LikesDislikesType from "../interfaces/LikesDislikesType";

const likeEndPoint = import.meta.env.VITE_SERVER + "/likes";
const dislikeEndPoint = import.meta.env.VITE_SERVER + "/dislikes";

export const removeLike = async (like: LikesDislikesType) => {
  return await (
    await fetch(likeEndPoint + "/users/" + like.user_id, {
      method: "DELETE",
    })
  ).json();
};

export const addLike = async (like: LikesDislikesType) => {
  return await (
    await fetch(likeEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(like),
    })
  ).json();
};

export const removeDislike = async (dislike: LikesDislikesType) => {
  return await (
    await fetch(dislikeEndPoint + "/users/" + dislike.user_id, {
      method: "DELETE",
    })
  ).json();
};

export const addDislike = async (dislike: LikesDislikesType) => {
  return await (
    await fetch(dislikeEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dislike),
    })
  ).json();
};

export const fetchLikesDislikes = async (card_id: number) => {
  const server = import.meta.env.VITE_SERVER;

  const likesEndPoint = server + "/likes/cards/" + card_id;
  const responseLikes: LikesDislikesType[] = await (
    await fetch(likesEndPoint)
  ).json();

  const dislikesEndPoint = server + "/dislikes/cards/" + card_id;
  const responseDislikes: LikesDislikesType[] = await (
    await fetch(dislikesEndPoint)
  ).json();

  return {
    likes: responseLikes,
    dislikes: responseDislikes,
  };
};
