import "./styles/CreateCardWindow.css";

import CreateCardType from "../interfaces/CreateCardType";
import * as cardApi from "../api/card";
import { useRef, useState } from "react";
import { useAppContext } from "../AppContextConst";
import CardType from "../interfaces/CardType";
import Card from "./Card";
import ReactTextareaAutosize from "react-textarea-autosize";
interface Props {
  setIsCreatingCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCardWindow: React.FC<Props> = (props) => {
  const useAppState = useAppContext();

  const frontTextRef = useRef<HTMLTextAreaElement>(null);
  const backTextRef = useRef<HTMLTextAreaElement>(null);
  const selectedCategory = useRef<HTMLSpanElement>(null);

  const [useCard, setUseCard] = useState<CardType | null>(null);

  const [useChosenCategory, setChosenCategory] = useState<number>(3);

  const CreateCardOnClick = async () => {
    if (!backTextRef.current || !frontTextRef.current || !useAppState.user)
      return;

    const frontText = frontTextRef.current.value.trim();
    const backText = backTextRef.current.value.trim();

    let error = false;
    if (frontText === "") {
      frontTextRef.current.classList.add("input-error");
      error = true;
    } else frontTextRef.current.classList.remove("input-error");

    if (backText === "") {
      backTextRef.current.classList.add("input-error");
      error = true;
    } else backTextRef.current.classList.remove("input-error");
    if (error) return;

    const card: CreateCardType = {
      back_text: backTextRef.current.value,
      front_text: frontTextRef.current.value,
      category_id: useChosenCategory,
      user_id: useAppState.user.id,
    };

    const response = await cardApi.createCard(card);

    if (response) setUseCard(response);
    frontTextRef.current.value = "";
    backTextRef.current.value = "";
  };
  const handleChosenCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    categoryId: number
  ) => {
    if (!selectedCategory.current) return;
    selectedCategory.current.textContent = event.currentTarget.textContent;
    setChosenCategory(categoryId);
  };

  return (
    <div className="creating-card-window">
      {useCard ? (
        <div className="creating-card-window__created-Card">
          <Card card={useCard} active={false} updateCallBack={() => {}}/>
        </div>
      ) : (
        <div className="creating-card-window__card-form">
          <h2 className="creating-card-window__h2">New Card</h2>
          <label className="creating-card-window__card-form__textarea">
            <span>Front</span>
            <ReactTextareaAutosize
              minRows={3}
              ref={frontTextRef}
            ></ReactTextareaAutosize>
          </label>
          <label className="creating-card-window__card-form__textarea">
            <span>Back</span>
            <ReactTextareaAutosize
              minRows={3}
              ref={backTextRef}
            ></ReactTextareaAutosize>
          </label>
          <div className="creating-card-window__category-Choices">
            <div className="creating-card-window__category-Choices__current-category">
              <h3 className="creating-card-window__category-Choices__current-category__h2">
                Category:
              </h3>
              <span ref={selectedCategory}>Whatever</span>
            </div>
            <div className="creating-card-window__category-Choices__buttons">
              <button
                onClick={(event) => handleChosenCategory(event, 1)}
                className="creating-card-window__category-Choices__buttons__button"
              >
                Joke
              </button>
              <button
                onClick={(event) => handleChosenCategory(event, 2)}
                className="creating-card-window__category-Choices__buttons__button"
              >
                Trivia
              </button>
              <button
                onClick={(event) => handleChosenCategory(event, 3)}
                className="creating-card-window__category-Choices__buttons__button"
              >
                Whatever
              </button>
            </div>
          </div>
          <button onClick={CreateCardOnClick} className="submit-button">
            submit
          </button>
        </div>
      )}
      <button
        onClick={() => props.setIsCreatingCard(false)}
        className="close-button"
      >
        close
      </button>
    </div>
  );
};

export default CreateCardWindow;
