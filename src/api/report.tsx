const REPORT_ENDPOINT_CARDS = import.meta.env.VITE_SERVER + "/cards-reports";
const REPORT_ENDPOINT_COMMENTS =
	import.meta.env.VITE_SERVER + "/comments-report";

export const addReport = async (cardId: number, userId: number | undefined) => {
    if (userId) {
        	return await(
						await fetch(REPORT_ENDPOINT_CARDS + `/${cardId}/${userId}`, {
							method: "POST",
						})
					).status;
    } else return;

};

export const addReportComment = async (commentId: number, userId: number | undefined) => {
	if (userId) {
		return await(
			await fetch(REPORT_ENDPOINT_COMMENTS + `/${commentId}/${userId}`, {
				method: "POST",
			})
		).status;
	} else return;
};
