import express from "express";
const router = express.Router();
import { registerNewUser } from "../controllers/auth.controller.js";
import passport from "passport";
import jwt from "jsonwebtoken";

router.post("/register", registerNewUser);
router.post("/login", (req, res, next) => {
	passport.authenticate("local", { session: false }, (err, user, info) => {
		if (err || !user)
			return res
				.status(401)
				.json({ success: false, message: info.message || "Login failed" });
		const payload = { id: user._id, role: user.role };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.status(200).json({ success: true, message: "Logged in", token });
	})(req, res, next);
});

export default router;
