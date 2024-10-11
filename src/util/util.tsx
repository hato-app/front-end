export const createHeader = (method: string, body:object) => {
	return {
		headers: {
			//Authorization: sessionData().token,
			"Content-Type": "application/json",
		},
		method: method,
		body: JSON.stringify(body),
	};
};
