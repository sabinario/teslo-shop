import { Button, Card, CardContent, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';

const CartPage = () => {
	return (
		<ShopLayout title='Carrito' pageDescription='Carrito de compras'>
			<Typography variant='h1' component='h1'>
				Carrito
			</Typography>
			<Grid container>
				<Grid xs={12} sm={7}>
					<CartList editable />
				</Grid>
				<Grid xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>Orden</Typography>
							<Divider sx={{ my: 1 }} />
							<OrderSummary />

							<Box sx={{ mt: 3 }}>
								<Button fullWidth color='secondary' className='circular-btn'>
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
