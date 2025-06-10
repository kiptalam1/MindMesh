import { NavLink } from "react-router-dom";
import { LiaHomeSolid, LiaCommentsSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";
import { BsSignpostSplit } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";

import "../styles/Dashboard.css";

const Dashboard = () => {
	return (
		<div className="dashboard">
			<aside className="sidebar">
				<NavLink to="/dashboard" className="sidebar-link">
					<LiaHomeSolid className="sidebar-icon" />
					Home
				</NavLink>
				<NavLink to="/posts" className="sidebar-link">
					<BsSignpostSplit className="sidebar-icon" />
					Posts
				</NavLink>
				<NavLink to="/users" className="sidebar-link">
					<FaRegUser className="sidebar-icon" />
					Users
				</NavLink>
				<NavLink to="/comments" className="sidebar-link">
					<LiaCommentsSolid className="sidebar-icon" />
					Comments
				</NavLink>
				<NavLink to="/logout" className="sidebar-link">
					<HiOutlineLogout className="sidebar-icon" />
					Logout
				</NavLink>
			</aside>
			<main className="content">
				<h1>Dashboard</h1>
				<p>Welcome to the admin dashboard!</p>
			</main>
		</div>
	);
};

export default Dashboard;
