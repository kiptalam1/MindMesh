import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./components/Header.jsx";

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</>
	);
};

export default App;
