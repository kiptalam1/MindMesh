// get comments from the backend by postId;
export const fetchCommentsByPost = async (postId) => {
	try {
		const response = await fetch(`/api/posts/${postId}/comments`);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data.data || [];
	} catch (error) {
		console.error("Error fetching comments:", error);
		return [];
	}
};
