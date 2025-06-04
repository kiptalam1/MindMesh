import React, { useState, useEffect } from "react";
import "../styles/LoginPage.css";

const LoginPage = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [success, setSuccess] = useState(null);
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			setMessage(data.message);
			setSuccess(true);

			// if login is successful; reset form after submission;
			if (data.success) {
				setFormData({
					email: "",
					password: "",
				});
			}
		} catch (error) {
			setMessage(error.message || "Login failed");
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
		<div className="login-page">
			{message && (
				<div className={`message-banner ${success ? "success" : "error"}`}>
					{message}
				</div>
			)}

			<form className="login-form" onSubmit={handleSubmit}>
				<input
					className="login-input"
					type="email"
					name="email"
					value={FormData.email}
					placeholder="Enter your email"
					onChange={handleChange}
				/>

				<input
					className="login-input"
					type="password"
					name="password"
					placeholder="Enter your password"
					value={FormData.password}
					onChange={handleChange}
				/>

				<button className="login-btn">Log in</button>
			</form>
		</div>
	);
};

export default LoginPage;
