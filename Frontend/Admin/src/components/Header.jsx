import { useState } from "react";
import { WiDaySunny, WiMoonWaningCrescent2 } from "react-icons/wi";
import "../styles/Header.css";

const Header = () => {
	const [darkMode, setDarkMode] = useState(
		() => localStorage.getItem("theme") === "dark"
	);
	const toggleDarkMode = () => {
		setDarkMode((prevMode) => {
			const newMode = !prevMode;
			localStorage.setItem("theme", newMode ? "dark" : "light");
			document.body.classList.toggle("dark", newMode);
			return newMode;
		});
	};

	return (
		<header className="header">
			<h1>MeshMind Admin</h1>
			<div className="theme-toggle" onClick={toggleDarkMode}>
				{darkMode ? <WiDaySunny /> : <WiMoonWaningCrescent2 />}
			</div>
		</header>
	);
};

export default Header;
