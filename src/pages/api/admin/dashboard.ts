import { db } from 'database';
import { Order, Product, User } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	lowInventory: number; // productos con 10 o menos
	notPaidOrders: number;
	numberOfClients: number;
	numberOfOrders: number;
	numberOfProducts: number;
	paidOrders: number;
	productsWithNoStock: number;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const data = await getDashboardData();

	res.status(200).json(data);
}

async function getDashboardData() {
	await db.connect();

	// Low performance
	// const paidOrders = await Order.find({ isPaid: true }).count();
	// const notPaidOrders = await Order.find({ isPaid: false }).count();
	// const numberOfClients = await User.find({ role: 'client' }).count();
	// const numberOfOrders = await Order.find().count();
	// const numberOfProducts = await Product.find().count();
	// const productsWithNoStock = await Product.find({ inStock: 0 }).count();
	// const lowInventory = await Product.find({ inStock: { $lte: 10 } }).count();

	const [
		paidOrders,
		notPaidOrders,
		numberOfClients,
		numberOfOrders,
		numberOfProducts,
		productsWithNoStock,
		lowInventory,
	] = await Promise.all([
		Order.find({ isPaid: true }).count(),
		Order.find({ isPaid: false }).count(),
		Order.find().count(),
		User.find({ role: 'client' }).count(),
		Product.find().count(),
		Product.find({ inStock: 0 }).count(),
		Product.find({ inStock: { $lte: 10 } }).count(),
	]);

	await db.disconnect();

	return {
		paidOrders,
		notPaidOrders,
		numberOfClients,
		numberOfOrders,
		numberOfProducts,
		productsWithNoStock,
		lowInventory,
	};
}
