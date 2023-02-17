import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const checkAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies["linkedin-token"];

	if (!token) {
		return res.status(401).json({
			message: "You are not authorized to access this route",
		});
	}

	try {
		const foundUser = await prisma.user.findUnique({
			where: {
				email: token,
			},
		});

		if (!foundUser) {
			throw new Error("User not found");
		}

		req.user = foundUser;

		next(req);
	} catch (error) {
		return res.status(401).json({
			message: "You are not authorized to access this route",
		});
	}
};
