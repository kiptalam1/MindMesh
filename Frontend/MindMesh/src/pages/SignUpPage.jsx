import React, { useState, useEffect } from "react";
import "../styles/SignUpPage.css";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch("api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			setMessage(data.message);
			setSuccess(true);

			if (data.success) {
				// Reset form after submission

				setFormData({
					username: "",
					email: "",
					password: "",
				});
			}
		} catch (error) {
			setMessage(error.message || "An error occurred");
			setSuccess(false);
		}
	};

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage("");
				setSuccess(null);
			}, 9000);
			return () => clearTimeout(timer);
		}
	}, [message]);

	return (
		<div className="signup-page">
			{message && (
				<div className={`message-banner ${success ? "success" : "error"}`}>
					{message}
				</div>
			)}
			<form className="signup-form" onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					placeholder="Enter your username"
					className="signup-input"
					value={formData.username}
					onChange={handleChange}
				/>
				<input
					type="email"
					name="email"
					placeholder="Enter your email"
					className="signup-input"
					value={formData.email}
					onChange={handleChange}
				/>

				<input
					type="password"
					name="password"
					placeholder="Enter your password"
					className="signup-input"
					value={formData.password}
					onChange={handleChange}
				/>
				<button className="signup-btn">Sign Up</button>
			</form>
		</div>
	);
};

export default SignUpPage;
