import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import postsRoutes from "./routes/posts.route.js";

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("mongo db connected"))
	.catch((err) => console.log("MongoDB connection error", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "welcome home" });
});

// routes;
app.use("/api/posts", postsRoutes);

const PORT = process.env.PORT;
// listen to app;
app.listen(PORT, () => console.log(`it's running !`));
