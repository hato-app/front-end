import "./styles/DeleteCard.css";
import { createHeader } from "../util/util";

type Props = {
	backAction(state:number): void;
	cardId: number;
	updateCallback(): void;
}



const DeleteCard: React.FC<Props> = ({backAction,cardId, updateCallback}) => {

	const BACKEND_SERVER = import.meta.env.VITE_SERVER

	const handleBackAction = () => {
		backAction(0);
	}

	const handleDeleteCard = async () => {
		const header = createHeader('DELETE',{});
		await fetch(BACKEND_SERVER + `/cards/${cardId}`, header);
		updateCallback();
	};


	return (
		<div className="card__delete_container animate">
			<h1 className="">Are you sure you want to delete this card?</h1>
			<div className="card__delete_container_choices">
				<button className="card__delete_button" onClick={handleDeleteCard}>
					Card is DONE
				</button>
				<button className="card__delete_button" onClick={handleBackAction}>
					NO, my card is forever
				</button>
			</div>
		</div>
	);
};

export default DeleteCard;
