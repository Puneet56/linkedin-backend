import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const authService = {
	createUser: async (user: {
		username: string;
		email: string;
		password: string;
	}) => {
		try {
			const { username, email, password } = user;
			const passwordHash = await bcrypt.hash(password, 10);

			const createdUser = await prisma.user.create({
				data: {
					username,
					email,
					password_hash: passwordHash,
				},
			});

			console.log("AuthService: createUserMethod - createdUser: ", {
				...createdUser,
				password_hash: null,
			});

			return Promise.resolve({ ...createdUser, password_hash: null });
		} catch (error) {
			console.log("AuthService: createUserMethod - error: ", error);
			return Promise.reject({
				message: "AuthService: createUserMethod - Error creating user",
			});
		}
	},
};

export default authService;
