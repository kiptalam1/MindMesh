// src/utils/api.js (same for both frontends)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const APP_NAME = import.meta.env.VITE_APP_NAME || "MindMesh";

export const apiFetch = async (path, options = {}) => {
	const url = `${API_BASE}${path}`;

	const defaultHeaders = {
		"Content-Type": "application/json",
		"X-App-Name": APP_NAME, // Identify which frontend is making the request
		...options.headers,
	};

	const config = {
		method: options.method || "GET",
		headers: defaultHeaders,
		credentials: "include",
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

		return response;
	} catch (err) {
		console.error(`API fetch error in ${APP_NAME}:`, err.message);
		throw err;
	}
};

// Optional: Different API configurations for different frontends
export const apiConfig = {
	baseURL: API_BASE,
	appName: APP_NAME,
	timeout: 10000, // 10 seconds
};

// Admin-specific API calls (only in admin frontend)
export const adminApiFetch = async (path, options = {}) => {
	return apiFetch(path, {
		...options,
		headers: {
			...options.headers,
			"X-Admin-Request": "true", // Mark as admin request
		},
	});
};
