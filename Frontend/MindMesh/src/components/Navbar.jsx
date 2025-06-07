import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { LuMoonStar, LuSun } from "react-icons/lu";
import "../styles/Navbar.css";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();

	const [darkMode, setDarkMode] = useState(
		() => localStorage.getItem("theme") === "dark"
	);

	useEffect(() => {
		document.body.classList.toggle("dark-mode", darkMode);
		localStorage.setItem("theme", darkMode ? "dark" : "light");
	}, [darkMode]);

	const handleLogout = () => {
		logout();
		navigate("/");
	};
	return (
		<div className="navbar">
			<div className="nav-container">
				{/* if user is already logged in then h1 redirects to posts page;
				if user is not logged in then h1 redirects to home page; */}
				{isAuthenticated ? (
					<NavLink to="/posts">
						<h1>MeshMind</h1>
					</NavLink>
				) : (
					<NavLink to="/">
						<h1>MeshMind</h1>
					</NavLink>
				)}
				<div className="links">
					<NavLink to="/" className="link">
						Home
					</NavLink>
					<NavLink to="/posts" className="link">
						Posts
					</NavLink>
					<NavLink to="/about" className="link">
						About
					</NavLink>

					{/* if the user is logged in then show the logout button; */}
					{isAuthenticated ? (
						<button onClick={handleLogout} className=" logout-btn">
							Logout
						</button>
					) : (
						<>
							<NavLink to="/login" className="link">
								Login
							</NavLink>
							<NavLink to="/signup" className="link">
								Sign Up
							</NavLink>
						</>
					)}
					<button
						className="toggle-btn"
						onClick={() => setDarkMode((prev) => !prev)}>
						{darkMode ? <LuSun /> : <LuMoonStar />}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
