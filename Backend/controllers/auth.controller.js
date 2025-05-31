import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const salt = 10;

export async function registerNewUser(req, res) {
	const { username, email, password } = req.body;
	if (!username || !email || !password)
		return res
			.status(400)
			.json({ success: false, message: "All fields are required" });

	try {
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new User({ username, email, password: hashedPassword });
		await newUser.save();

		res
			.status(201)
			.json({ success: true, message: "User registered", data: newUser });
	} catch (error) {
		return res.status(500).json({ success: false, message: "Server error" });
	}
}
