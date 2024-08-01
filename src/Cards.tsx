import { MouseEventHandler } from "react";
import SVGEye from "./assets/Eye";
import SVGComment from "./assets/Comment";
import SVGLike from "./assets/Like";
import SVGDislike from "./assets/Dislike";

interface Props {
  data: Data;
  setCardOnClick: MouseEventHandler;
  isItFront: boolean;
}
interface Data {
  id: number;
  user_id: number;
  category_id: string;
  front_text: string;
  back_text: string;
  views: number;
}
const Cards: React.FC<Props> = (props) => {
  const { data, setCardOnClick, isItFront } = props;
  return (
    <>
      <div onClick={setCardOnClick} className="card">
        {!isItFront ? (
          <h2>{data.front_text}</h2>
        ) : (
          <h2>
            {data.back_text}
            <div>
              <SVGEye />
              <SVGLike />
              <SVGDislike />
              <SVGComment />
            </div>
          </h2>
        )}
      </div>
    </>
  );
};
export default Cards;
