import { db } from 'database';
import { IProduct } from 'interfaces';
import { Product } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { message: string } | IProduct[];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getProducts(req, res);
		case 'PUT':
			break;
		case 'POST':
			break;

		default:
			res.status(400).json({ message: 'Bad Request' });
	}
}
async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
	await db.connect();

	const products = await Product.find().sort({ title: 'asc' }).lean();

	// TODO: Tenemos que actualizar las imagenes

	if (!products) {
		await db.disconnect();
		return res.status(400).json({ message: 'No hay products' });
	}

	await db.disconnect();
	return res.status(200).json(products);
}
