import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./components/Header.jsx";
import DashboardHome from "./components/DashboardHome.jsx";
import Posts from "./components/Posts.jsx";

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/dashboard" element={<Dashboard />}>
					<Route index element={<DashboardHome />} />
					<Route path="posts" element={<Posts />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
