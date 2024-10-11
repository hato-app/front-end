import "./styles/CardComment.css";

import * as reportApi from "../api/report";
import moment from "moment";
import CommentsType from "../interfaces/CommentsType";
import SVGReport from "./assets/Report";
import { useEffect, useState } from "react";
import { useAppContext } from "../AppContextConst";

interface Props {
  comment: CommentsType;
}
const CardComment: React.FC<Props> = (props) => {

  const [reported,setReported] = useState(false);
  const useAppState = useAppContext();
  useEffect(() => {
    setReported(false);
  },[props]);

  const handleReportComment = async () => {
    await reportApi.addReportComment(props.comment.id, useAppState.user?.id);
    setReported(true);
  }

  return (
		<div className="card-comment">
			{!reported ? (
				<>
					{" "}
					<div className="card-comment__text">
						<span>{props.comment.text}</span>
						<button className="card-report-flag" onClick={handleReportComment}>
							<span>
								<SVGReport />
							</span>
						</button>
					</div>
					<div className="card-comment__created_at">
						<span>Posted {moment(props.comment.created_at).fromNow()}</span>
					</div>
				</>
			) : (
				<p>Reported!</p>
			)}
		</div>
	);
};
export default CardComment;
