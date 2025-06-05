import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};
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
				</div>
			</div>
		</div>
	);
};

export default Navbar;
