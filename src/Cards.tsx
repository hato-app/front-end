import { MouseEventHandler, useState, useEffect } from "react";
import SVGEye from "./assets/Eye";
import SVGComment from "./assets/Comment";
import SVGLike from "./assets/Like";
import SVGDislike from "./assets/Dislike";
import { Data } from "./interfaces/data.interface";

interface Props {
  data: Data | null;
  setCardOnClick: MouseEventHandler;
  isItFront: boolean;
  server: string;
}
// interface Data {
//   id: number;
//   user_id: number;
//   category_id: string;
//   front_text: string;
//   back_text: string;
//   views: number;
// }
const Cards: React.FC<Props> = (props) => {
  const { data, server, setCardOnClick, isItFront } = props;

  useEffect(() => {
    handleGetLikesAndDislikes();
  }, []);

  const [likesNum, setLikesNum] = useState(0);
  const [dislikesNum, setDislikesNum] = useState(0);
  const [commentsList, setCommentsList] = useState([]);

  async function handleGetLikesAndDislikes() {
    console.log(data);
    const likesReq = await (
      await fetch(`${server}/likes/cards/${data?.id}`)
    ).json();
    const dislikesReq = await (
      await fetch(`${server}/dislikes/cards/${data?.id}`)
    ).json();
    setLikesNum(likesReq.length);
    setDislikesNum(dislikesReq.length);
  }

  return (
    <>
      <div onClick={setCardOnClick} className="card">
        {!isItFront ? (
          <h2>{data?.front_text}</h2>
        ) : (
          <>
            <h2>{data?.back_text}</h2>
            <SVGComment className="svg" />
            <div className="svg-container">
              <div className="likes-container">
                <SVGLike className="svg" />
                {likesNum}
                <SVGDislike className="svg" />
                {dislikesNum}
              </div>
              <div className="views">
                {data?.views}
                <SVGEye className="svg" />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Cards;
