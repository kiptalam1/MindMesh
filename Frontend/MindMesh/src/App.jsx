import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
// import NotFound from "./pages/NotFound";
import { useAuth } from "./contexts/AuthContext";
import AboutPage from "./pages/AboutPage";

function App() {
	const { isAuthenticated } = useAuth();
	return (
		<>
			{isAuthenticated === null ? (
				<p>Loading...</p>
			) : (
				<>
					<Navbar />
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/posts" element={<PostsPage />} />
						<Route path="/posts/:postId" element={<PostPage />} />
						<Route
							path="/signup"
							element={
								!isAuthenticated ? <SignUpPage /> : <Navigate to="/posts" />
							}
						/>
						<Route
							path="/login"
							element={
								!isAuthenticated ? <LoginPage /> : <Navigate to="/posts" />
							}
						/>
						{/* <Route path="*" element={<NotFound />} /> */}
					</Routes>
				</>
			)}
		</>
	);
}

export default App;
