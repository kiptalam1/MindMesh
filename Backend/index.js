import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import "./configs/passport-local.js";
import postsRoutes from "./routes/posts.route.js";
import authRoutes from "./routes/auth.route.js";
import commentRoutes from "./routes/comment.route.js";

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("mongo db connected"))
	.catch((err) => console.log("MongoDB connection error", err));

const app = express();

app.use(express.json());
app.use(passport.initialize());
// connect to frontend;
// CORS Configuration - IMPORTANT FOR PRODUCTION
const corsOptions = {
	origin: [
		"http://localhost:5173", // Vite dev server
		"http://localhost:5000",
		"https://mind-mesh-two.vercel.app",
	],
	credentials: true, // Important if you're using cookies/sessions
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.json({ message: "welcome home" });
});

// routes;
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/posts", postsRoutes);



const PORT = process.env.PORT;
// listen to app;
app.listen(PORT, () => console.log(`it's running !`));
