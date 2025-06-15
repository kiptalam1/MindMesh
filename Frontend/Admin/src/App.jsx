import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./components/Header.jsx";
import DashboardHome from "./components/DashboardHome.jsx";
import Posts from "./components/Posts.jsx";
import Post from "./components/Post.jsx";
import PostForm from "./components/PostForm.jsx";
import Logout from "./pages/Logout.jsx";
import Comments from "./pages/Comments.jsx";

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/dashboard" element={<Dashboard />}>
					<Route index element={<DashboardHome />} />
					<Route path="posts" element={<Posts />} />
					<Route path="posts/:postId" element={<Post />} />
					<Route path="posts/new-post" element={<PostForm />} />
					<Route path="posts/edit/:postId" element={<PostForm />} />
					<Route path="comments" element={<Comments />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
