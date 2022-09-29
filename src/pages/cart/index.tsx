import { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';
import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	Typography,
} from '../../shared';

const CartPage = () => {
	const { cart, isLoaded } = useContext(CartContext);
	const router = useRouter();

	useEffect(() => {
		if (isLoaded && cart.length === 0) {
			router.replace('/cart/empty');
		}
	}, [cart.length, isLoaded, router]);

	if (!isLoaded || cart.length === 0) {
		return <></>;
	}

	return (
		<ShopLayout title='Carrito' pageDescription='Carrito de compras'>
			<Typography variant='h1' component='h1'>
				Carrito
			</Typography>
			<Grid container sx={{ mt: 2 }} spacing={2}>
				<Grid
					xs={12}
					md={7}
					display='flex'
					flexDirection='column'
					justifyContent='center'
				>
					<CartList editable />
				</Grid>
				<Grid xs={12} md={5} spacing={0}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>Orden</Typography>
							<Divider sx={{ my: 1 }} />
							<OrderSummary />

							<Box sx={{ mt: 3 }}>
								<Button
									fullWidth
									color='secondary'
									className='circular-btn'
									href='/checkout/address'
								>
									Checkout
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default CartPage;
