import { useEffect, useState } from "react";
import * as likesDislikesApi from "../api/likes-dislikes";
import { useAppContext } from "../AppContext";
import LikesDislikesType from "../interfaces/LikesDislikesType";

interface Props {
  card_id: number;
}

const LikesDisLikesButtons: React.FC<Props> = (props) => {
  const useAppState = useAppContext();

  const [useLikesDislikes, setLikesDislikes] = useState<{
    likes: LikesDislikesType[];
    dislikes: LikesDislikesType[];
  } | null>(null);

  useEffect(() => {
    fetchLikesDislikes();
  }, []);

  const fetchLikesDislikes = async () => {
    setLikesDislikes(await likesDislikesApi.fetchLikesDislikes(props.card_id));
  };

  const handleLikeDislikeClick = async (likeDislikeCode: number) => {
    const user = useAppState.user;
    if (!useLikesDislikes || !user) return;

    setLikesDislikes(await likesDislikesApi.fetchLikesDislikes(props.card_id));

    const userLikedIndex = useLikesDislikes.likes.findIndex(
      (like: LikesDislikesType) => like.user_id === user.id
    );
    const userDislikedIndex = useLikesDislikes.dislikes.findIndex(
      (dislike: LikesDislikesType) => dislike.user_id === user.id
    );

    const likeDislike: LikesDislikesType = {
      user_id: user.id,
      card_id: props.card_id,
    };

    switch (likeDislikeCode) {
      case 1:
        if (userLikedIndex >= 0) await removeLike(likeDislike);
        else if (userDislikedIndex >= 0) {
          await removeDislike(likeDislike);
          await addLike(likeDislike);
        } else await addLike(likeDislike);
        break;

      case -1:
        if (userDislikedIndex >= 0) await removeDislike(likeDislike);
        else if (userLikedIndex >= 0) {
          await removeLike(likeDislike);
          await addDislike(likeDislike);
        } else await addDislike(likeDislike);
        break;
    }

    await fetchLikesDislikes();
  };

  const addLike = async (likeDislike: LikesDislikesType) => {
    await likesDislikesApi.addLike(likeDislike);
  };

  const removeLike = async (likeDislike: LikesDislikesType) => {
    await likesDislikesApi.removeLike(likeDislike);
  };

  const addDislike = async (likeDislike: LikesDislikesType) => {
    await likesDislikesApi.addDislike(likeDislike);
  };

  const removeDislike = async (likeDislike: LikesDislikesType) => {
    await likesDislikesApi.removeDislike(likeDislike);
  };

  return (
    useLikesDislikes && (
      <div className="likesDislikesButtons">
        <button
          type="button"
          className="like"
          onClick={() => handleLikeDislikeClick(1)}
          disabled={useAppState.user ? false : true}
        >
          <span>{useLikesDislikes.likes.length}</span>
          <span>Like</span>
        </button>
        <button
          type="button"
          className="dislike"
          onClick={() => handleLikeDislikeClick(-1)}
          disabled={useAppState.user ? false : true}
        >
          <span>{useLikesDislikes.dislikes.length}</span>
          <span>Dislike</span>
        </button>
      </div>
    )
  );
};

export default LikesDisLikesButtons;
