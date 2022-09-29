import { useContext } from 'react';

import { ItemCounter } from 'components';
import { CartContext } from 'context';
import { ICartProduct, IOrderItem } from 'interfaces';
import NextLink from 'next/link';
import {
	Box,
	Button,
	CardActionArea,
	CardMedia,
	Grid,
	Link,
	Typography,
} from 'shared/material-components';
import { currency } from 'utils';

interface Props {
	editable?: boolean;
	products?: IOrderItem[];
}

export const CartList = ({ products, editable = false }: Props) => {
	const {
		cart: productsInCart,
		updateCartProduct,
		removeCartProduct,
	} = useContext(CartContext);

	const onChangeQuantity = (
		newQuantityValue: number,
		product: ICartProduct
	) => {
		product.quantity = newQuantityValue;
		updateCartProduct(product);
	};

	const productsToShow = products ? products : productsInCart;

	return (
		<>
			{productsToShow.map((product) => (
				<Grid
					container
					spacing={0}
					sx={{
						mb: 1,
						flexDirection: { xs: 'column', sm: 'row' },
					}}
					key={product.slug + product.size}
					alignItems='center'
				>
					<Grid xs={12} sm={4}>
						<NextLink href={`/product/${product.slug}`}>
							<Link>
								<CardActionArea>
									<CardMedia
										image={`/products/${product.image}`}
										component='img'
										sx={{ borderRadius: '5px' }}
									/>
								</CardActionArea>
							</Link>
						</NextLink>
					</Grid>
					<Grid
						xs={12}
						sm={6}
						display='flex'
						alignItems='center'
						sx={{ justifyContent: { xs: 'center' } }}
					>
						<Box
							display='flex'
							flexDirection='column'
							sx={{ alignItems: { xs: 'center' } }}
						>
							<Typography variant='body1' textAlign='center'>
								{product.title}
							</Typography>
							<Typography variant='body1'>
								Talla <strong>{product.size}</strong>
							</Typography>
							{editable ? (
								<ItemCounter
									currentQuantity={product.quantity}
									onQuantityChange={(value) =>
										onChangeQuantity(value, product as ICartProduct)
									}
									maxValue={10}
								/>
							) : (
								<Typography variant='h5'>
									{product.quantity}{' '}
									{product.quantity > 1 ? 'productos' : 'producto'}
								</Typography>
							)}
						</Box>
					</Grid>
					<Grid
						xs={12}
						sm={2}
						display='flex'
						alignItems='center'
						flexDirection='column'
					>
						<Typography variant='subtitle1'>
							{currency.formatCurrency(product.price)}
						</Typography>
						{editable && (
							<Button
								variant='text'
								color='error'
								onClick={() => removeCartProduct(product as ICartProduct)}
							>
								Remover
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
