import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.css";
import { apiFetch } from "../utils/api.js";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await apiFetch("api/auth/register", {
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
				// Redirect user to login page after successful signup;
				setTimeout(() => navigate("/login"), 2000);
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
