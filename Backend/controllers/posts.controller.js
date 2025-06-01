import mongoose from "mongoose";
import Post from "../models/post.model.js";

//delete a post;
export async function deletePost(req, res) {
	const { id } = req.params;
	//find post from the database;
	try {
		const deletedPost = await Post.findByIdAndDelete(id);
		//if the post is not found;
		if (!deletedPost) {
			return res
				.status(404)
				.json({ success: false, message: "Post not found" });
		}
		//else;
		res
			.status(200)
			.json({ success: true, message: "Post deleted", data: deletedPost });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}

//update existing post;
export async function updatePost(req, res) {
	const updates = req.body;
	const { id } = req.params;

	try {
		const findPost = await Post.findByIdAndUpdate(id, updates, { new: true });

		if (!findPost)
			return res
				.status(404)
				.json({ success: false, message: "Post not found" });

		return res
			.status(200)
			.json({
				success: true,
				message: "Post updated successfully",
				data: findPost,
			});
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
	const imageUrl = req.file?.path;

	if (!title || !content || !author)
		return res.status(400).json({
			success: false,
			message: "Title, content, author and image are required",
		});

	try {
		const post = new Post({
			title,
			content,
			author,
			published: !!published,
			imageUrl,
		});

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

// Get single post by ID
export async function getSinglePost(req, res) {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: "Invalid post ID" });
	}

	try {
		const post = await Post.findById(id).populate("author", "username email");

		if (!post) {
			return res
				.status(404)
				.json({ success: false, message: "Post not found" });
		}

		res.status(200).json({ success: true, data: post });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}
