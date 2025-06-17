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
//- IMPORTANT FOR PRODUCTION
// CORS Configuration for Multiple Frontends
const corsOptions = {
	origin: function (origin, callback) {
		const allowedOrigins = [
			// Development environments
			"http://localhost:5173", // Frontend 1 (Vite default)
			"http://localhost:3000", // Frontend 2

			// Production environments
			"https://mind-mesh-two.vercel.app", // User-facing frontend
			"https://mind-mesh-admin.vercel.app", // Admin panel frontend
		];

		// Allow requests with no origin (mobile apps, Postman, etc.)
		if (!origin) return callback(null, true);

		if (allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			console.log(`CORS blocked request from: ${origin}`);
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true, // Important for authentication cookies/headers
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
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
