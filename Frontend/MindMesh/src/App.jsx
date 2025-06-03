import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import SignUpPage from "./pages/SignUpPage";
// import NotFound from "./pages/NotFound";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/posts" element={<PostsPage />} />
				<Route path="/posts/:postId" element={<PostPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				{/* <Route path="*" element={<NotFound />} /> */}
			</Routes>
		</>
	);
}

export default App;
