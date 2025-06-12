import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useAuth } from "../contexts/AuthContext";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isPublished, setIsPublished] = useState(false);
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState("");
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState("");

	const { user, token } = useAuth();
	// console.log(user, token);

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
			const res = await fetch("/api/posts", {
				method: "POST",
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

			// Reset form
			setTitle("");
			setContent("");
			setIsPublished(false);
			setImage(null);
			setImageUrl("");
		} catch (error) {
			console.error("Error creating post", error);
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
			{/* display message */}
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
				// onInit={(_evt, editor) => (editorRef.current = editor)}
				onEditorChange={setContent}
				init={{
					height: 500,
					menubar: true,
					plugins: [
						"advlist",
						"autolink",
						"lists",
						"link",
						"image",
						"charmap",
						"preview",
						"anchor",
						"searchreplace",
						"visualblocks",
						"code",
						"fullscreen",
						"insertdatetime",
						"media",
						"table",
						"code",
						"help",
						"wordcount",
					],
					toolbar:
						"undo redo | blocks | " +
						"bold italic forecolor | alignleft aligncenter " +
						"alignright alignjustify | bullist numlist outdent indent | " +
						"removeformat | help",
					content_style:
						"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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
			<button type="submit">Create Post</button>
		</form>
	);
};

export default CreatePost;
