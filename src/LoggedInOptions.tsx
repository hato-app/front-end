import "./LoggedInOptions.css";
import { useState } from "react";
import { Card } from "./interfaces/card.interface";
interface LoggedInProps {
  isLoggedIn: boolean;
}
const LoggedInOptions:React.FC<LoggedInProps> = ({isLoggedIn}) => {
    //useStates
    const [cardFront, setCardFront] = useState<string>('');
    const [cardBack, setCardBack] = useState<string>('');
    const [createdCard, setCreatedCard] = useState<Card | null>(null);
    const [isMakingCard, setIsMakingCard] = useState<boolean>(false)
    //useEffects

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
        setCreatedCard(created);
    }
    function handleMakingCard() {
        !isMakingCard ? setIsMakingCard(true) : setIsMakingCard(false);
    }


    return <div className='belowCard'>
        {/* <Comments/> */}
        <div>
            {!isMakingCard ? (
                <div className='loggedInButtons'>
                    <button onClick={handleMakingCard} disabled={!isLoggedIn} >Create a card!</button>
                    <button>Get another random message!</button>
                 </div>
                ) : (
                <div className='cardCreation'>
                    <div className='inputCreate'>
                    <textarea rows={5}cols={33}  placeholder="FRONT"  />
                    </div>
                    <div className='creationButtons'>
                        <button onClick={handleMakingCard}>submit</button>
                        <button onClick={handleMakingCard}>cancel</button>
                    </div>
                </div>
            )}
        </div>
    
      



        <div className='notLoggedIn'>
            <h1>Log in to create, like, comment !</h1>
        </div>

    </div>
}

export default LoggedInOptions;
