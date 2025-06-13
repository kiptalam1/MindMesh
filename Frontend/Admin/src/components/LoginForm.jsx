import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode"; // make sure this is installed
import "../styles/LoginForm.css";

const LoginForm = () => {
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { login } = useAuth();
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
			setSuccess(data.success);

			if (data.success) {
				const decoded = jwtDecode(data.token);

				if (decoded.role !== "admin") {
					setSuccess(false);
					setMessage("Access denied: Admins only.");
					return;
				}

				login(data.token);
				setFormData({ email: "", password: "" });

				// Optional: redirect sooner
				setTimeout(() => {
					navigate("/dashboard");
				}, 1000);
			}
		} catch (error) {
			console.error("Login failed:", error);
			setMessage("Login failed. Please try again.");
			setSuccess(false);
		}
	};

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage("");
				setSuccess(null);
			}, 2000);
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
