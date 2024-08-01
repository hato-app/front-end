import { MouseEventHandler } from "react";
interface Props {
  data: Data;
  setCardOnClick: MouseEventHandler;
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
  const { data, setCardOnClick } = props;
  return (
    <>
      <div onClick={setCardOnClick}>
        <h2></h2>
      </div>
    </>
  );
};
export default Cards;
