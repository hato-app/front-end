import { useEffect, useRef, useState } from "react";
import { Data } from "./interfaces/data.interface";
import { Comment } from "./interfaces/comment.interface"
interface CommentProps {
    data: Data | null;
    isFrontOrBack: boolean;
}

const Comments: React.FC<CommentProps> = ({data, isFrontOrBack}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    //useStates
    const [allCardComments, setAllCardComments] = useState<string[] | null>(null)
    const [typingComment, setTypingComment] = useState<string>("")
    //useEffects

    useEffect(() => {
        handleGetCardComments();
    }, [data])
    
    //handlers
    async function handleGetCardComments() {
        if(data === null) return;
        const req = await fetch(import.meta.env.VITE_SERVER+"/comments/cards/"+data.id);
        const res = await req.json();
        const commentsArray = await res.map((obj:Comment) => obj.text)
        setAllCardComments(commentsArray);
    }
    async function handlePostComment() {
        if(data === null) return;
        const req = await fetch(import.meta.env.VITE_SERVER+"/comments/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                card_id: data.id,
                text: typingComment,
            })
        });
        let refresh = await handleGetCardComments();
        eraseTextAfterSubmit();
    }
    function handleSetTypingComment(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTypingComment(event.target.value);
    }
    function eraseTextAfterSubmit() {
        if(textareaRef.current) textareaRef.current.value = "";
    }
    let allCommentsDiv;
    if(allCardComments){
        allCommentsDiv = allCardComments.map((comment:string, i) => <div className="oneComment" key={i}>{comment}</div>)
    }

    return <>
    {isFrontOrBack ? (
        <div className="commentList">
            {allCommentsDiv}
            <div id="commentInput">
                <textarea id="commentTextArea" rows={2} cols={30} onChange={handleSetTypingComment} ref={textareaRef}></textarea>
                <button onClick={handlePostComment}>post comment</button>
            </div>
        </div>
        ) : (
        <span/>
        )}
    </>
}



export default Comments;