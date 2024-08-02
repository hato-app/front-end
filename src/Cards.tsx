import { MouseEventHandler, useState, useEffect } from "react";
import SVGEye from "./assets/Eye";
import SVGComment from "./assets/Comment";
import SVGLike from "./assets/Like";
import SVGDislike from "./assets/Dislike";
import { Data } from "./interfaces/data.interface";

interface Props {
  data: Data | null;
  setCardOnClick: (setCardState?:boolean) => void;
  isItFront: boolean;
  server: string;
}
const Cards: React.FC<Props> = (props) => {
  const { data, server, setCardOnClick, isItFront } = props;

  useEffect(() => {
    handleGetLikesAndDislikes();
  }, []);

  const [likesNum, setLikesNum] = useState(0);
  const [dislikesNum, setDislikesNum] = useState(0);
  const [commentsList, setCommentsList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  async function handleGetLikesAndDislikes() {
    const likesReq = await (
      await fetch(`${server}/likes/cards/${data?.id}`)
    ).json();
    const dislikesReq = await (
      await fetch(`${server}/dislikes/cards/${data?.id}`)
    ).json();
    setLikesNum(likesReq.length);
    setDislikesNum(dislikesReq.length);
  }
  async function handleCreateLikes() {
    console.log(isClicked);
    handleSetIsClicked();
    if (!isClicked) {
      await fetch(`${server}/likes`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          user_id: 1,
          card_id: data?.id,
        }),
      });
    } else {
      await fetch(`${server}/likes/cards/${data?.id}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      });
    }
    handleGetLikesAndDislikes();
  }
  async function handleCreateDislikes() {
    console.log(isClicked);
    handleSetIsClicked();
    if (!isClicked) {
      await fetch(`${server}/dislikes`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          user_id: 1,
          card_id: data?.id,
        }),
      });
    } else {
      await fetch(`${server}/dislikes/cards/${data?.id}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      });
    }
    handleGetLikesAndDislikes();
  }
  function handleSetIsClicked() {
    setIsClicked(!isClicked);
  }

  return (
    <>
      <div onClick={() => setCardOnClick()} className="card">
        {!isItFront ? (
          <h2>{data?.front_text}</h2>
        ) : (
          <>
            <h2>{data?.back_text}</h2>

            <div className="svg-container">
              <div className="views">
                {data?.views}
                <SVGEye className="svg" />
              </div>
            </div>
          </>
        )}
      </div>
      {isItFront && (
        <>
          <SVGComment className="svg" />
          <div className="likes-container">
            <SVGLike className="svg" onClick={handleCreateLikes} />
            {likesNum}
            <SVGDislike className="svg" onClick={handleCreateDislikes} />
            {dislikesNum}
          </div>
        </>
      )}
    </>
  );
};
export default Cards;
