import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../../database';
import { IProduct } from '../../../../interfaces';
import { Product } from '../../../../models';

type Data = { message: string } | IProduct;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getProductBySlug(req, res);

		default:
			res.status(400).json({ message: 'Bad request' });
	}
}

async function getProductBySlug(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { slug } = req.query;

	await db.connect();
	const requestProduct = await Product.findOne({ slug }).lean();

	if (!requestProduct) {
		await db.disconnect();

		return res.status(400).json({ message: 'Product does not exits' });
	}

	await db.disconnect();

	res.status(200).json(requestProduct);
}
