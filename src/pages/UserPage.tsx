import { useEffect, useState } from "react";
import * as cardApi from "../api/card";
import CardType from "../interfaces/CardType";
import Card from "../components/Card";
import * as commentApi from "../api/comments";
import CommentsType from "../interfaces/CommentsType";
import CardComment from "../components/CardComment";
import { useAppContext } from "../AppContextConst";
import "../components/styles/Users.css";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
	const navigate = useNavigate();
	const useAppState = useAppContext();

	const [useCards, setCards] = useState<CardType[] | null>(null);
	const [useComments, setComments] = useState<CommentsType[] | null>(null);

	useEffect(() => {
		if (!useAppState.user) navigate("/login");
		fetchCardsByUserId();
		fetchCommentsByUserId();
	}, [useAppState]);

	const fetchCardsByUserId = async () => {
		if (useAppState.user) {
			const cards = await cardApi.fetchCardsByUserId(useAppState.user.id);
			setCards(cards);
		}
	};

	const fetchCommentsByUserId = async () => {
		if (useAppState.user) {
			const comments = await commentApi.fetchCommentsByUserId(
				useAppState.user.id
			);
			setComments(comments);
		}
	};

	const handleUpdateCallback = () => {
		setCards(null);
		fetchCardsByUserId();
	};

	return (
		useAppState.user && (
			<section className="user-page">
				<div className="user-page__user-info">
					<h2 className="user-page__h2">User Info</h2>
					<div className="user-page__user__id"></div>
					<div className="user-page__user__name">
						<strong>Username: </strong>
						<span>{useAppState.user.username}</span>
					</div>
					<div className="user-page__user__created_at">
						<strong>Created at: </strong>
						<span>
							{new Date(useAppState.user.created_at).toLocaleDateString()}
						</span>
					</div>
				</div>
				<div className="user-page__comment-history">
					<h3 className="user-page__comment-history__h3">Your Card</h3>
					<div className="user-page__comment-history__comments">
						{useComments &&
							useComments.map((comment, index) => (
								<CardComment key={index} comment={comment}></CardComment>
							))}
					</div>
				</div>
				<hr className="user-page__hr" />
				<div className="user-page__card-history">
					<h3 className="user-page__card-history__h3">Your cards</h3>
					<div className="user-page__card-history__cards">
						{useCards &&
							useCards.map((card, index) => (
								<Card
									key={index}
									card={card}
									active={false}
									updateCallBack={handleUpdateCallback}
								></Card>
							))}
					</div>
				</div>
			</section>
		)
	);
};

export default UserPage;
