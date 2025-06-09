import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

const LoginForm = () => {
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();
			setMessage(data.message);
			setSuccess(true);

			if (data.success) {
				setFormData({ email: "", password: "" });
				setTimeout(() => {
					navigate("/dashboard");
				}, 5000);
			}
		} catch (error) {
			console.error("Login failed:", error);
			setMessage(data.message || "Login failed");
			setSuccess(false);
		}
	};

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage("");
				setSuccess(null);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [message]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			{/*  handle message display; */}
			{message && (
				<div className={`message-banner ${success ? "success" : "error"}`}>
					{message}
				</div>
			)}
			<input
				className="input-field"
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				placeholder="Email"
				required
			/>
			<input
				className="input-field"
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				placeholder="Password"
				required
			/>
			<button className="login-btn" type="submit">
				Login
			</button>
		</form>
	);
};

export default LoginForm;
