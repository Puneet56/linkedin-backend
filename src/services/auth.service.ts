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

	signIn: async (user: { email: string; password: string }) => {
		try {
			const { email, password } = user;

			const foundUser = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (!foundUser) {
				return Promise.reject({
					message: "AuthService: signInMethod - User not found",
				});
			}

			const passwordMatch = await bcrypt.compare(
				password,
				foundUser.password_hash
			);

			if (!passwordMatch) {
				return Promise.reject({
					message: "AuthService: signInMethod - Incorrect password",
				});
			}

			return Promise.resolve({
				...foundUser,
				password_hash: null,
			});
		} catch (error) {
			console.log("AuthService: signInMethod - error: ", error);
			return Promise.reject({
				message: "AuthService: signInMethod - Error signing in",
			});
		}
	},
};

export default authService;
