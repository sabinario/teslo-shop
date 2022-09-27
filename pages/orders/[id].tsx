import React from 'react';

import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';

import { CreditCardOffOutlined } from '@mui/icons-material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import {
	Box,
	Card,
	CardContent,
	Chip,
	Divider,
	Grid,
	Link,
	Typography,
} from '../../shared';
import { CreditScoreOutlined } from '../../shared/material-icons';
import { countries } from '../../utils';

interface Props {
	order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
	const { shippingAddress } = order;
	return (
		<ShopLayout
			title='Resumen de la orden #'
			pageDescription='Resumen de la orden'
		>
			<Typography variant='h1' component='h1'>
				Orden: #
			</Typography>

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
					label='Pendiente de pago'
					variant='outlined'
					color='error'
					icon={<CreditCardOffOutlined />}
				/>
			)}

			<Grid container>
				<Grid xs={12} sm={7}>
					<CartList products={order.orderItems} />
				</Grid>
				<Grid xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>
								Resumen ({order.numberOfItems}
								{order.numberOfItems > 1 ? ' productos' : ' producto'}){' '}
							</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display='flex' justifyContent='space-between'>
								<Typography variant='subtitle1'>
									Dirección de entrega
								</Typography>
								<NextLink href='/checkout/address' passHref>
									<Link underline='always'>Editar</Link>
								</NextLink>
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

							<Divider sx={{ my: 1 }} />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/cart' passHref>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>

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
									<h1>Pagar</h1>
								)}
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const { id = '' } = query;
	const session: any = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: `/auth/login?p=/orders/${id}`,
				permanent: false,
			},
		};
	}

	const order = await dbOrders.getOrderById(id.toString());

	if (!order) {
		return {
			redirect: {
				destination: '/orders/history',
				permanent: false,
			},
		};
	}

	if (order.user !== session.user._id) {
		return {
			redirect: {
				destination: '/orders/history',
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
