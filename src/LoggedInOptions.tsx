import "./LoggedInOptions.css";
import { useEffect, useState } from "react";
import { Card } from "./interfaces/card.interface";
import { Data } from "./interfaces/data.interface";
import Comments from "./Comments";

let whatCategory: string|null = null;
interface LoggedInProps {
  isLoggedIn: boolean;
  handleSetDisplayedCard: (card:Card | null) => void;
  handleIsFrontOrBack: (setCardState?:boolean) => void;
  data: Data | null;
  isFrontOrBack: boolean;
}

const LoggedInOptions:React.FC<LoggedInProps> = ({isLoggedIn, handleSetDisplayedCard, handleIsFrontOrBack, data, isFrontOrBack}) => {
    //useStates
    const [cardFront, setCardFront] = useState<string>('');
    const [cardBack, setCardBack] = useState<string>('');
    const [createCardCategory, setCreateCardCategory] = useState<number>(3);
    const [createdCard, setCreatedCard] = useState<Card | null>(null);
    const [newCard, setNewCard] = useState<Card | null>(null);
    const [isMakingCard, setIsMakingCard] = useState<boolean>(false);
    const [isChoosingType, setIsChoosingType] = useState<boolean>(false);

    //useEffects
    useEffect(() => {
        handleSetDisplayedCard(createdCard);
    }, [createdCard])

    useEffect(() => {
        handleSetDisplayedCard(newCard);
    }, [newCard])
    

    //handleFunctions 
    async function createCard() {  
        const res = await fetch(import.meta.env.VITE_SERVER+"/cards/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                front_text: cardFront,
                back_text: cardBack,
                category_id: createCardCategory,
            }),
        });
        const created = (await res.json());
        setCreatedCard(created[0]);
    }
    async function getNewCard(id:number) {
        const res = await fetch(import.meta.env.VITE_SERVER+"/cards/categories/" + id)
        const readable: Card[] = await res.json();
        const resLength: number = readable.length;
        const randomIndex: number = Math.floor(Math.random()*resLength);
        const receivedCard: Card = readable[randomIndex];
        setNewCard(receivedCard);
        handleIsChoosingType();
        handleIsFrontOrBack(false);
    }

    function handleMakingCard() {
        !isMakingCard ? setIsMakingCard(true) : setIsMakingCard(false);
    }
    function handleCardFront (event: React.ChangeEvent<HTMLTextAreaElement>) {
        const front = event.target.value;
        setCardFront(front);
    }
    function handleCardBack (event: React.ChangeEvent<HTMLTextAreaElement>) {
        const back = event.target.value;
        setCardBack(back);
    }
    async function handleSubmitButton() {
        let sendReq = await createCard();
        handleMakingCard();
    }
    function handleIsChoosingType() {
        !isChoosingType ? setIsChoosingType(true) : setIsChoosingType(false);
    }
    
    
    function handleSelectingCreateCategory(id: number) {
        setCreateCardCategory(id);
        if(id === 1){
            whatCategory = "JOKE";
        } else if(id === 2){
            whatCategory = "TRIVIA";
        } else {
           whatCategory = "WHATEVER";
        }
    }


    return <div className='belowCard'>
        <div>
            <Comments
            data = {data}
            isFrontOrBack = {isFrontOrBack}
            />
            {!isMakingCard ? (
                <div className='loggedInButtons'>
                    <button onClick={handleMakingCard} disabled={!isLoggedIn} >Create a card!</button>
                    <button onClick={handleIsChoosingType}>Get another random message!</button>
                    {!isChoosingType ? (
                        <span/>
                    ) : (
                        <div className="typeButtons">
                            <button onClick={() => getNewCard(1)}>Jokes</button>
                            <button onClick={() => getNewCard(2)}>Trivia</button>
                            <button onClick={() => getNewCard(3)}>Whatever</button>
                        </div>
                    )}
                 </div>
                ) : (
                <div className='cardCreation'>
                    <div className='inputCreate'>
                        <textarea rows={5}cols={33} onChange={handleCardFront} placeholder="FRONT"  />
                        <textarea rows={5}cols={33} onChange={handleCardBack} placeholder="BACK"  />
                    </div>
                  
                    <div className="typeInput">
                        {whatCategory ? (
                            <h3>Your current card is classified as {whatCategory} card</h3>
                        ) : (<span/> )}
                        <button onClick={() => handleSelectingCreateCategory(1)}>Joke</button>
                        <button onClick={() => handleSelectingCreateCategory(2)}>Trivia</button>
                        <button onClick={() => handleSelectingCreateCategory(3)}>None</button>
                    </div>
                    <div className='creationButtons'>
                        <button onClick={handleSubmitButton}>submit</button>
                        <button onClick={handleMakingCard}>cancel</button>
                    </div>
                </div>
            )}
        </div>
      


        {!isLoggedIn ? (
            <div className='notLoggedIn'>
                <h1>Log in to create, like, comment !</h1>
            </div>
        ) : (
            <div className="commentCreator">
                <h1>pluh</h1>
            </div>
        )}

    </div>
}

export default LoggedInOptions;
