/// <reference types="vite/client" />

const apiKey: string = import.meta.env.VITE_REACT_API_KEY;

export const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${apiKey}`,
	},
};
