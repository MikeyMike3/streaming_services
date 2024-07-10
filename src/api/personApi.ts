import { options } from "./options";

export const fetchPersonDetails = async (personId: number) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/person/${personId}?language=en-US`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching person details:", error);
		throw error;
	}
};

export const fetchPersonCredits = async (personId: number) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/person/${personId}/combined_credits?language=en-US`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching person credits:", error);
		throw error;
	}
};
