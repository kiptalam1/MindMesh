import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
	return (
		<div className="navbar">
			<div className="nav-container">
				<NavLink to={"/"}>
					<h1>MeshMind</h1>
				</NavLink>
				<div className="links">
					<NavLink to="/" className="link">
						Home
					</NavLink>
					<NavLink to="/about" className="link">
						About
					</NavLink>
					<NavLink to="/posts" className="link">
						Posts
					</NavLink>
					<NavLink to="/login" className="link">
						Login
					</NavLink>
					<NavLink to="/signup" className="link">
						Sign Up
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
