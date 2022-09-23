import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import User from '../../../models/User';
import { jwt, validations } from '../../../utils';

type Data =
	| { message: string }
	| {
			token: string;
			user: {
				email: string;
				name: string;
				role: string;
			};
	  };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'POST':
			return registerUser(req, res);
		default:
			res.status(400).json({ message: 'Bad Request' });
	}
}
async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
	const {
		name = '',
		email = '',
		password = '',
	} = req.body as { name: string; email: string; password: string };

	if (password.length < 6) {
		return res.status(400).json({
			message: 'La contraseña debe ser de 6 caracteres o más',
		});
	}

	if (name.length < 2) {
		return res.status(400).json({
			message: 'El nombr debe tener al menos 2 caracteres',
		});
	}

	//Todo: validad email
	if (!validations.isValidEmail(email)) {
		return res.status(400).json({
			message: 'El correo no tiene el formato correcto',
		});
	}

	await db.connect();
	const user = await User.findOne({ email });

	if (user) {
		await db.disconnect();
		return res.status(400).json({
			message: 'Usuario ya existe',
		});
	}

	const newUser = new User({
		email: email.toLowerCase(),
		password: bcrypt.hashSync(password),
		role: 'client',
		name,
	});

	try {
		await newUser.save({ validateBeforeSave: true });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Check server logs' });
	}

	const { _id, role } = newUser;

	const token = jwt.signToken(_id, email);

	return res.status(200).json({ token, user: { email, role, name } });
}
