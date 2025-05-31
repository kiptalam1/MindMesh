import Post from "../models/post.model.js";

//update existing post;
export async function updatePost(req, res) {
	const updates = req.body;
	const { id } = req.params;

	try {
		
		const findPost = await Post.findByIdAndUpdate(id, updates, { new: true });

		if (!findPost) return res.status(404).json({ success: false, message: "Post not found" });

		return res.status(200).json({success: true, message: "Post updated successfully", data: findPost})

	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}


// write a new post;
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

// retrieve all the posts;
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
