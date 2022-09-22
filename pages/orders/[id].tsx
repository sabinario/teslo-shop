import React from 'react';

import NextLink from 'next/link';

import { CreditScoreOutlined } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	Chip,
	Divider,
	Grid,
	Link,
	Typography,
} from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';

const OrderPage = () => {
	return (
		<ShopLayout
			title='Resumen de la orden #'
			pageDescription='Resumen de la orden'
		>
			<Typography variant='h1' component='h1'>
				Orden: #
			</Typography>

			{/* <Chip
				sx={{ my: 2 }}
				label='Pendiente de pago'
				variant='outlined'
				color='error'
				icon={<CreditCardOffOutlined />}
			/> */}
			<Chip
				sx={{ my: 2 }}
				label='Orden pagada'
				variant='outlined'
				color='success'
				icon={<CreditScoreOutlined />}
			/>
			<Grid container>
				<Grid xs={12} sm={7}>
					<CartList editable />
				</Grid>
				<Grid xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>Resumen (3 productos) </Typography>
							<Divider sx={{ my: 1 }} />

							<Box display='flex' justifyContent='space-between'>
								<Typography variant='subtitle1'>
									Dirección de entrega
								</Typography>
								<NextLink href='/checkout/address' passHref>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>

							<Typography>Sabino Fernandez</Typography>
							<Typography>470 Vista Alegre</Typography>
							<Typography>Santaigo de Surco, 15054</Typography>
							<Typography>Perú</Typography>
							<Typography>+51 965 874 523</Typography>

							<Divider sx={{ my: 1 }} />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/cart' passHref>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>

							<OrderSummary />

							<Box sx={{ mt: 3 }}>
								<h1>Pagar</h1>
								<Chip
									sx={{ my: 2 }}
									label='Orden pagada'
									variant='outlined'
									color='success'
									icon={<CreditScoreOutlined />}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default OrderPage;
