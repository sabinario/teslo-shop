import { db } from 'database';
import { IOrder } from 'interfaces';
import { Order } from 'models';
import { isValidObjectId } from 'mongoose';

export const getOrderById = async (id: string): Promise<IOrder | null> => {
	if (!isValidObjectId(id)) {
		return null;
	}

	await db.connect();

	const order = await Order.findById(id).lean();

	await db.disconnect();

	if (!order) {
		return null;
	}

	return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUser = async (
	userId: string
): Promise<IOrder[] | null> => {
	if (!isValidObjectId(userId)) {
		return null;
	}

	await db.connect();

	const userOrders = await Order.find({ user: userId }).lean();

	await db.disconnect();

	if (!userOrders) {
		return null;
	}

	return JSON.parse(JSON.stringify(userOrders));
};
