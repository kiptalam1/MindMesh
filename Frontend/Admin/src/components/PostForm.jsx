import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/PostForm.css";

const PostForm = () => {
	const { postId } = useParams(); // null when creating, set when editing
	const isEditMode = Boolean(postId);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isPublished, setIsPublished] = useState(false);
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState("");
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState("");

	const { user, token } = useAuth();
	const navigate = useNavigate();
	// ✅ Fetch post data for editing
	useEffect(() => {
		if (isEditMode) {
			const fetchPost = async () => {
				try {
					const res = await fetch(`/api/posts/${postId}`);
					if (!res.ok) throw new Error("Failed to fetch post");
					const data = await res.json();

					setTitle(data.data.title);
					setContent(data.data.content);
					setIsPublished(data.data.published);
					setImageUrl(data.data.imageUrl || "");
				} catch (err) {
					console.error(err);
					setMessage("Could not load post for editing");
				}
			};
			fetchPost();
		}
	}, [isEditMode, postId]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setMessage("");
		setSuccess(false);

		if (!user || user.role !== "admin") {
			setMessage("Unauthorized");
			return;
		}

		if (image && imageUrl) {
			setMessage("Use either a file or a URL, not both.");
			return;
		}

		if (!image && !imageUrl) {
			setMessage("Provide an image file or image URL.");
			return;
		}

		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", content);
		formData.append("published", isPublished);

		if (image) {
			formData.append("image", image);
			formData.append("imageUrl", "");
		} else {
			formData.append("imageUrl", imageUrl);
		}

		try {
			const res = await fetch(`/api/posts/${postId || ""}`, {
				method: isEditMode ? "PUT" : "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});

			if (!res.ok) {
				const errorText = await res.text();
				throw new Error(`Request failed: ${res.status} ${errorText}`);
			}

			const data = await res.json();
			setSuccess(data.success);
			setMessage(data.message);

			// On success: navigate back or reset form
			if (isEditMode) {
				navigate("/dashboard/posts");
			} else {
				setTitle("");
				setContent("");
				setIsPublished(false);
				setImage(null);
				setImageUrl("");
			}
		} catch (error) {
			console.error("Error submitting post", error);
			setMessage(error.message);
		}
	};

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage("");
				setSuccess(null);
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [message, success]);

	return (
		<form
			className="post-form"
			encType="multipart/form-data"
			onSubmit={handleSubmit}>
			{message && (
				<div className={`message-banner ${success ? "success" : "error"}`}>
					{message}
				</div>
			)}

			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>

			<Editor
				apiKey="dk1rq41anieaefjx13uatdwqub4773ui0xyotmxpaa70h8vf"
				onEditorChange={setContent}
				value={content}
				init={{
					height: 500,
					menubar: true,
					plugins: [
						"advlist autolink lists link image charmap preview anchor",
						"searchreplace visualblocks code fullscreen",
						"insertdatetime media table code help wordcount",
					],
					toolbar:
						"undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
					placeholder: "Start writing your blog post here...",
					branding: false,
				}}
			/>

			<label>
				Published:
				<input
					type="checkbox"
					checked={isPublished}
					onChange={(e) => setIsPublished(e.target.checked)}
				/>
			</label>

			<div>
				<label>
					Upload image:
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setImage(e.target.files[0])}
					/>
				</label>
			</div>

			<div>
				<label>
					Or use url:
					<input
						type="url"
						placeholder="https://example.com/image.jpg"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</label>
			</div>

			<button type="submit">
				{isEditMode ? "Update Post" : "Create Post"}
			</button>
		</form>
	);
};

export default PostForm;
