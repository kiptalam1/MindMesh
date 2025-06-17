// ./Frontend/MindMesh/src/utils/api.js
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiFetch = async (path, options = {}) => {
	const url = `${API_BASE}${path}`;

	const defaultHeaders = {
		"Content-Type": "application/json",
		...options.headers,
	};

	const config = {
		method: options.method || "GET",
		headers: defaultHeaders,
		credentials: "include", // include cookies if needed
		...options,
	};

	try {
		const response = await fetch(url, config);

		if (!response.ok) {
			let errorMessage = `HTTP error! status: ${response.status}`;
			try {
				const errorData = await response.json();
				errorMessage = errorData.message || errorMessage;
			} catch {
				// If response is not JSON, use default message
			}
			throw new Error(errorMessage);
		}

		return response; // Return the response object, not await response.json()
	} catch (err) {
		console.error("API fetch error:", err.message);
		throw err;
	}
};
