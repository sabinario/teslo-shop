import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT');
	}

	return jwt.sign(
		// PAYLOAD
		{
			_id,
			email,
		},
		// SEED
		process.env.JWT_SECRET_SEED,
		// OPTIONS
		{ expiresIn: '30d' }
	);
};

export const isValidToken = (token: string): Promise<string> => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT');
	}

	return new Promise((resolve, reject) => {
		try {
			jwt.verify(token, process.env.JWT_SECRET_SEED || '', (error, payload) => {
				if (error) return reject('El JWT no es válido');

				const { _id } = payload as { _id: string };

				resolve(_id);
			});
		} catch (err) {
			reject('El JWT no es válido');
		}
	});
};
