import { MouseEventHandler, useEffect } from "react";
import SVGEye from "./assets/Eye";
import SVGComment from "./assets/Comment";
import SVGLike from "./assets/Like";
import SVGDislike from "./assets/Dislike";
import { Data } from "./interfaces/data.interface";

interface Props {
  data: Data | null;
  setCardOnClick: MouseEventHandler;
  isItFront: boolean;
}

const Cards: React.FC<Props> = (props) => {
  const { data, setCardOnClick, isItFront } = props;


  return (
    <>
      <div onClick={setCardOnClick} className="card">
        {!isItFront ? (
          <h2>{data?.front_text}</h2>
        ) : (
          <h2>
            {data?.back_text}
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
