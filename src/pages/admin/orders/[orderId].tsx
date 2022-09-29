import React from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { CartList, OrderSummary } from 'components/cart';
import { AdminLayout } from 'components/layouts';
import { dbOrders } from 'database';
import { IOrder } from 'interfaces';
import {
	Box,
	Card,
	CardContent,
	Chip,
	CreditCardOffOutlined,
	CreditScoreOutlined,
	Divider,
	Grid,
	ShoppingCartIcon,
	Typography,
} from 'shared';
import { countries } from 'utils';

interface Props {
	order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
	const { shippingAddress } = order;

	return (
		<AdminLayout
			title='Resumen de la orden'
			subTitle={`Orden ID: ${order._id}`}
			icon={<ShoppingCartIcon sx={{ ml: 2, fontSize: 32 }} />}
		>
			<Grid container>
				<Grid xs={12} sm={7}>
					<CartList products={order.orderItems} />
				</Grid>
				<Grid sm={1} />
				<Grid xs={12} sm={4}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>
								Resumen ({order.numberOfItems}
								{order.numberOfItems > 1 ? ' productos' : ' producto'}){' '}
							</Typography>

							<Divider />

							<Box display='flex' justifyContent='space-between'>
								<Typography variant='subtitle1'>
									Dirección de entrega
								</Typography>
							</Box>

							<Typography>
								{shippingAddress.firstName} {shippingAddress.lastname}
							</Typography>

							<Typography>
								{shippingAddress.address}
								{shippingAddress.address2
									? `, ${shippingAddress.address2}`
									: ''}
							</Typography>

							<Typography>
								{shippingAddress.city}, {shippingAddress.zipCode}
							</Typography>

							<Typography>
								{
									countries[
										countries.findIndex(
											(c) => c.code === shippingAddress.country
										)
									].name
								}
							</Typography>

							<Typography>{shippingAddress.phone}</Typography>

							<Divider />

							<OrderSummary orderData={{ ...order }} />

							<Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
								{order.isPaid ? (
									<Chip
										sx={{ my: 2 }}
										label='Orden pagada'
										variant='outlined'
										color='success'
										icon={<CreditScoreOutlined />}
									/>
								) : (
									<Chip
										sx={{ my: 2 }}
										label='Orden pendiente'
										variant='outlined'
										color='error'
										icon={<CreditCardOffOutlined />}
									/>
								)}
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { orderId = '' } = query;
	const order = await dbOrders.getOrderById(orderId.toString());

	if (!order) {
		return {
			redirect: {
				destination: '/admin/orders',
				permanent: false,
			},
		};
	}

	return {
		props: {
			order,
		},
	};
};

export default OrderPage;
