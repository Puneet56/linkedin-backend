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

export default authRouter;
