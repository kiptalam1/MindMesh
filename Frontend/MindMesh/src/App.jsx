import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
// import NotFound from "./pages/NotFound";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Homepage />} />
				{/* <Route path="*" element={<NotFound />} /> */}
			</Routes>
		</>
	);
}

export default App;
