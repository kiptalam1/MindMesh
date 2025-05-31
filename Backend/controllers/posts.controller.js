import Post from "../models/post.model.js";


export async function createPost(req, res) {
	const { title, content, published, author } = req.body;

	if (!title || !content || !author)
		return res.status(400).json({
			success: false,
			message: "Title, content, and author are required",
		});

	try {
		const post = new Post({ title, content, author, published: !!published });

		await post.save();
		res.status(201).json({
			success: true,
			message: "Post created successfully",
			data: post,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}

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
