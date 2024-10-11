import { useEffect, useState } from "react";
import "../components/styles/Admin.css";
import Reports from "../interfaces/Reports";
import DeleteSVG from "../components/assets/DeleteSVG";
import "../components/styles/Users.css";

interface Admin {
  user_id: number;
  text: string;
  card_id: number;
}
const Admin = () => {
  const [reported, setReported] = useState<Reports[] | null>(null);

  useEffect(() => {
    fetchReportedThings();
  }, []);

  const fetchReportedThings = async () => {
    const endPoint = import.meta.env.VITE_SERVER + "/cards-reports/all";
    const fetched = await fetch(endPoint);
    const jsoned: Reports[] | [] = await fetched.json();
    console.log(jsoned)
    setReported(jsoned)
  }

  const deleteCard = async (cardId: string) => {
    const endPoint = import.meta.env.VITE_SERVER + "/cards/" + cardId;
    await fetch(endPoint, { method: "DELETE" })
    await fetchReportedThings()
  }

  const deleteComment = async (commentId: string) => {
    const endPoint = import.meta.env.VITE_SERVER + "/comments/" + commentId;
    await fetch(endPoint, { method: "DELETE" })
    await fetchReportedThings()
  }

  return (reported === null ? null :
    <>
      <div className="admin-container">
        {reported.map((elem) => {
          return (
            <>
              {
                reported.length === 0 ? null :
                  <div className="cards-container" key={elem.card.id + "card"}>
                    {elem.card.back_text}<br></br>
                    {elem.card.front_text}
                    {elem.card.is_flagged === false ? null :
                      <div className="deleteBtn">
                        <button onClick={() => { deleteCard(elem.card.id) }}>
                          <DeleteSVG />
                        </button>
                      </div>
                    }
                  </div>
              }
              {
                elem.card.comments === undefined || elem.card.comments.length === 0 ? null :
                  <div className="comments-container" key={`${elem.card.id}-comment`}>
                    {elem.card.comments.map((elem2) => {
                      return (elem2.text === null ? null :
                        <>
                          <div key={elem.card.id + elem2.id}>
                            <div className="comments">
                              {elem2.text}
                              <div className="deleteBtn">
                                <button className="delete" onClick={() => { deleteComment(elem2.id) }}>
                                  <DeleteSVG />
                                </button>
                              </div>
                            </div>

                          </div>
                        </>
                      )
                    })}
                  </div>
              }
            </>
          )
        })}
      </div>
    </>)
  // }
};

export default Admin;
