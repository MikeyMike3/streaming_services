const apiKey = import.meta.env.VITE_API_KEY;

export const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${apiKey}`,
	},
};
