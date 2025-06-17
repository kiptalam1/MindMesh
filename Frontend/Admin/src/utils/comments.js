import { adminApiFetch } from "./api.js";

export async function fetchAllComments() {
	try {
		const res = await adminApiFetch("/api/comments");
		if (!res.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await res.json();
		return {
			data: data.data || [],
			message: data.message || "",
			success: data.success ?? true,
		};
	} catch (error) {
		console.error("Error fetching all comments", error);
		return {
			data: [],
			message: "Failed to fetch comments",
			success: false,
		};
	}
}

export async function deleteComment(commentId, token) {
	try {
		const res = await adminApiFetch(`/api/comments/${commentId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!res.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await res.json();
		return {
			success: data.success || "",
			message: data.message ?? true,
		};
	} catch (error) {
		console.error("Error fetching all comments", error);
		return {
			success: false,
			message: "Failed to delete comment",
		};
	}
}
