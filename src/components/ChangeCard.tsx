import "./styles/ChangeCard.css";
import { createHeader } from "../util/util";
import { useState } from "react";

type Props = {
	backAction(state: number): void;
	cardId: number;
	frontText: string;
	backText: string;
	updateCallback(): void;
};

const ChangeCard: React.FC<Props> = ({
	backAction,
	cardId,
	frontText,
	backText,
	updateCallback,
}) => {
	const BACKEND_SERVER = import.meta.env.VITE_SERVER;

	//State = 0 Front; State = 1 Back

	const DEFAULT_FRONT = "flip-card-front__change";
	const DEFAULT_BACK = "flip-card-back__change";
	const FLIP_CLASS = " flip__change_flip_transform";

	const STATUS_NO_SAVE = "";
	const STATUS_SAVING = "Saving";
	const STATUS_SAVED = "Saved";

	const [classFlipFront, setClassFlipFront] = useState(DEFAULT_FRONT);
	const [classFlipBack, setClassFlipBack] = useState(DEFAULT_BACK + FLIP_CLASS);
	const [stateFlipFlop, setStateFlipFlop] = useState(0);

	const [cardFrontText, setCardFrontText] = useState(frontText);
	const [cardBackText, setCardBackText] = useState(backText);
	const [savingStatus, setSavingStauts] = useState("");

	const handleBackAction = () => {
		backAction(0);
	};

	const handleFlipCard = async () => {
		switch (stateFlipFlop) {
			case 0:
				setClassFlipFront(DEFAULT_FRONT);
				setClassFlipBack(DEFAULT_BACK + FLIP_CLASS);
				setStateFlipFlop(1);
				break;
			case 1:
				setClassFlipFront(DEFAULT_FRONT + FLIP_CLASS);
				setClassFlipBack(DEFAULT_BACK);
				setStateFlipFlop(0);
				break;
			default:
				console.log("Out of index!");
		}
	};

	const handleChangeFrontText = (
		event: React.FormEvent<HTMLTextAreaElement>
	) => {
		setCardFrontText(event.currentTarget.value);
	};

	const handleChangeBackText = (
		event: React.FormEvent<HTMLTextAreaElement>
	) => {
		setCardBackText(event.currentTarget.value);
	};

	const handleSave = async () => {
		setSavingStauts(STATUS_SAVING);
		const header = createHeader("PATCH", {
			card: {
				front_text: cardFrontText,
				back_text: cardBackText,
			},
		});
		await fetch(BACKEND_SERVER + `/cards/${cardId}`, header)
			.then(() => {
				setSavingStauts(STATUS_SAVED);
				return new Promise((r) => setTimeout(r, 1000));
			})
			.then(() => {
				setSavingStauts("");
				handleBackAction();
			})
			.catch(() => {
				setSavingStauts("");
			});
		updateCallback();
	};

	return (
		<div className="flip-card__change">
			<div className="flip-card-inner__change">
				<div className={classFlipFront}>
					{savingStatus === STATUS_NO_SAVE ? (
						<>
							<textarea
								className="flip-card__change_textarea"
								value={cardFrontText}
								onChange={handleChangeFrontText}
							></textarea>
							<div className="flip-card__change_comands_container">
								<button
									className="card__change_comands_button button_back"
									onClick={handleBackAction}
								>
									Back
								</button>
								<button
									className="card__change_comands_button button_flip"
									onClick={handleFlipCard}
								>
									Flip
								</button>

								<button
									className="card__change_comands_button button_save"
									onClick={handleSave}
								>
									Save
								</button>
							</div>
						</>
					) : (
						<p>{savingStatus}</p>
					)}
				</div>
				<div className={classFlipBack}>
					{savingStatus === STATUS_NO_SAVE ? (
						<>
							<textarea
								className="flip-card__change_textarea"
								value={cardBackText}
								onChange={handleChangeBackText}
							></textarea>
							<div className="flip-card__change_comands_container">
								<button
									className="card__change_comands_button button_back"
									onClick={handleBackAction}
								>
									Back
								</button>
								<button
									className="card__change_comands_button button_flip"
									onClick={handleFlipCard}
								>
									Flip
								</button>

								<button
									className="card__change_comands_button button_save"
									onClick={handleSave}
								>
									Save
								</button>
							</div>
						</>
					) : (
						<p>{savingStatus}</p>
					)}
				</div>
			</div>
		</div>
		// <div className="card__change_container">
		// 	<div className="flip-card-inner">
		// 		<div className="flip-card-front" onClick={() => {}}>
		// 			<input type="text" value={frontText}></input>
		// 			<button onClick={handleBackAction}>Back</button>
		// 			<button onClick={handleFlipCard}>Flip</button>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default ChangeCard;
