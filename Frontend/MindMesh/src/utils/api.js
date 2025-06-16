// src/utils/api.js

const API_BASE = import.meta.env.VITE_API_URL || "";

export const apiFetch = async (path, options = {}) => {
	const url = `${API_BASE}${path}`;

	const defaultHeaders = {
		"Content-Type": "application/json",
		...(options.headers || {}),
	};

	const config = {
		method: options.method || "GET",
		headers: defaultHeaders,
		credentials: "include", // optional: include cookies if needed
		...options,
	};

	try {
		const response = await fetch(url, config);
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "API request failed");
		}
		return await response.json();
	} catch (err) {
		console.error("API fetch error:", err.message);
		throw err;
	}
};
