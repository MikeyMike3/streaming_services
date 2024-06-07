import { options } from "./options";

export const fetchPersonDetails = async (personId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/person/${personId}?language=en-US`,
		options
	);
	return res.json();
};

export const fetchPersonCredits = async (personId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/person/${personId}/combined_credits?language=en-US`,
		options
	);
	return res.json();
};
