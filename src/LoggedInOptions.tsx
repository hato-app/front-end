import "./LoggedInOptions.css";
import { useEffect, useState } from "react";
import { Card } from "./interfaces/card.interface";
import { Data } from "./interfaces/data.interface";

interface LoggedInProps {
  isLoggedIn: boolean;
  handleSetDisplayedCard: (card:Card | null) => void;
  handleIsFrontOrBack: () => void;
}

const LoggedInOptions:React.FC<LoggedInProps> = ({isLoggedIn, handleSetDisplayedCard, handleIsFrontOrBack}) => {
    //useStates
    const [cardFront, setCardFront] = useState<string>('');
    const [cardBack, setCardBack] = useState<string>('');
    const [createdCard, setCreatedCard] = useState<Card | null>(null);
    const [isMakingCard, setIsMakingCard] = useState<boolean>(false);
    const [isChoosingType, setIsChoosingType] = useState<boolean>(false);
    const [chosenCategory, setChosenCategory] = useState<number | null>(null);
    //useEffects
    useEffect(() => {
        handleSetDisplayedCard(createdCard);
    }, [createdCard])

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
            }),
        });
        const created = (await res.json());
        setCreatedCard(created[0]);
    }
    async function getNewCard(event: React.MouseEvent<HTMLButtonElement>) {
        const setWantedCategory = await handleSetChosenCategory(event);
        const res = await fetch(import.meta.env.VITE_SERVER+"/cards/category/" + chosenCategory)
        const readable: Card[] = await res.json();
        const resLength: number = readable.length;
        const randomIndex: number = Math.floor(Math.random()*resLength);
        const receivedCard: Card = readable[randomIndex];
        setCreatedCard(receivedCard);
        handleIsChoosingType();
        handleIsFrontOrBack();
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
    async function handleSetChosenCategory(event: React.MouseEvent<HTMLButtonElement>) {
        const buttonTarget = await event.target as HTMLButtonElement;
        const final = await setChosenCategory(Number(buttonTarget.id))
        console.log(chosenCategory)
    }


    return <div className='belowCard'>
        <div>
            {!isMakingCard ? (
                <div className='loggedInButtons'>
                    <button onClick={handleMakingCard} disabled={!isLoggedIn} >Create a card!</button>
                    <button onClick={handleIsChoosingType}>Get another random message!</button>
                    {!isChoosingType ? (
                        <span/>
                    ) : (
                        <div className="typeButtons">
                            <button onClick={handleSetChosenCategory} id="1">Jokes</button>
                            <button>Trivia</button>
                            <button>Whatever</button>
                        </div>
                    )}
                 </div>
                ) : (
                <div className='cardCreation'>
                    <div className='inputCreate'>
                        <textarea rows={5}cols={33} onChange={handleCardFront} placeholder="FRONT"  />
                        <textarea rows={5}cols={33} onChange={handleCardBack} placeholder="BACK"  />
                    </div>
                    <div className='creationButtons'>
                        <button onClick={handleSubmitButton}>submit</button>
                        <button onClick={handleMakingCard}>cancel</button>
                    </div>
                </div>
            )}
        </div>
        {/* <Comments/> */}
      


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
