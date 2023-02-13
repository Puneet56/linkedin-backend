import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post(`/signup`, async (req, res) => {
	const { username, email, password } = req.body;
	console.log({ username, email, password });

	const passwordHash = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			username,
			email,
			password_hash: passwordHash,
		},
	});

	const createdUser = await prisma.user.findUnique({
		where: { id: user.id },
	});

	res.json({ ...createdUser, password_hash: null });
});

const server = app.listen(5000, () =>
	console.log(`
🚀 Server ready at: http://localhost:5000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
