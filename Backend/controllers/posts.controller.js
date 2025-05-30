import Post from "../models/post.model.js";

export async function getAllPosts(req, res) {
	try {
		const posts = await Post.find();

		if (posts.length === 0)
			return res
				.status(200)
				.json({ success: true, message: "No posts yet", data: [] });
		res.status(200).json({
			success: true,
			data: posts,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Sever error",
		});
	}
}
