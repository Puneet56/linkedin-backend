import express from "express";
import authService from "../services/auth.service";

const authRouter = express.Router();

authRouter.post(`/signup`, async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const user = await authService.createUser({ username, email, password });
		return res.status(201).json(user);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
});

authRouter.post(`/signin`, async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await authService.signIn({ email, password });
		return res
			.cookie("linkedin-cookie", "token", {
				httpOnly: true,
				expires: new Date(Date.now() + 900000),
			})
			.status(200)
			.json(user);
	} catch (error: any) {
		return res.status(400).json({ message: error.message });
	}
});

export default authRouter;
