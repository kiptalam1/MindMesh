import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		logout();
		navigate("/", { replace: true }); // Redirect to homepage
	}, [logout, navigate]);

	return null; // No UI needed
};

export default Logout;
