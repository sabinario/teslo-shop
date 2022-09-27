import React, { useContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Divider,
	Grid,
	Link,
	Typography,
} from '../../shared';
import { countries } from '../../utils';

const SummaryPage = () => {
	const router = useRouter();
	const [isPosting, setIsPosting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const {
		address: shippingAddress,
		numberOfItems,
		createOrder,
	} = useContext(CartContext);

	useEffect(() => {
		if (!Cookies.get('firstName')) {
			router.push('/');
		}
	}, [router]);

	if (!shippingAddress) {
		return <></>;
	}

	const onCreateOrder = async () => {
		setIsPosting(true);
		try {
			const { hasError, message } = await createOrder();

			if (hasError) {
				setIsPosting(false);
				setErrorMessage(message);
				return;
			}

			router.replace(`/orders/${message}`);
		} catch (error) {
			setIsPosting(false);
		}
	};

	const {
		firstName,
		lastname,
		address,
		address2,
		city,
		phone,
		country,
		zipCode,
	} = shippingAddress;

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
							<Typography variant='h2'>
								Resumen ({numberOfItems}{' '}
								{numberOfItems > 1 ? 'productos' : 'producto'}){' '}
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
								{firstName} {lastname}
							</Typography>
							<Typography>
								{address}
								{address2 ? `, ${address2}` : ''}
							</Typography>
							<Typography>
								{city}, {zipCode}
							</Typography>
							<Typography>
								{countries[countries.findIndex((c) => c.code === country)].name}
							</Typography>
							<Typography>{phone}</Typography>

							<Divider sx={{ my: 1 }} />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/cart' passHref>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>

							<OrderSummary />

							<Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
								<Button
									fullWidth
									color='secondary'
									className='circular-btn'
									onClick={onCreateOrder}
									disabled={isPosting}
								>
									Confirmar order
								</Button>

								{errorMessage && (
									<Chip label={errorMessage} color='error' sx={{ mt: 2 }} />
								)}
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default SummaryPage;
