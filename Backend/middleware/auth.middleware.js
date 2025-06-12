import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function authenticateToken(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	if (!token)
		return res
			.status(401)
			.json({ success: false, message: "Access denied. No token provided." });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id).select("-password");
		next();
	} catch (err) {
		return res.status(403).json({ success: false, message: "No permission" });
	}
}
