import NextLink from 'next/link';

import { initialData } from '../../database/products';
import {
	Box,
	Button,
	CardActionArea,
	CardMedia,
	Grid,
	Link,
	Typography,
} from '../../shared/material-components';
import { ItemCounter } from '../ui';

const productsInCart = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2],
];

interface Props {
	editable?: boolean;
}

export const CartList = ({ editable = false }: Props) => {
	return (
		<>
			{productsInCart.map((product) => (
				<Grid container spacing={2} sx={{ mb: 1 }} key={product.slug}>
					<Grid xs={3}>
						<NextLink href={`/product/${product.slug}`}>
							<Link>
								<CardActionArea>
									<CardMedia
										image={`/products/${product.images[0]}`}
										component='img'
										sx={{ borderRadius: '5px' }}
									/>
								</CardActionArea>
							</Link>
						</NextLink>
					</Grid>
					<Grid xs={7} display='flex' alignItems='center'>
						<Box display='flex' flexDirection='column'>
							<Typography variant='body1'>{product.title}</Typography>
							<Typography variant='body1'>
								Talla <strong>M</strong>
							</Typography>
							{editable ? (
								<ItemCounter />
							) : (
								<Typography variant='h4'>3</Typography>
							)}
						</Box>
					</Grid>
					<Grid
						xs={2}
						display='flex'
						alignItems='center'
						flexDirection='column'
					>
						<Typography variant='subtitle1'>{`$${product.price}`}</Typography>
						{editable && (
							<Button variant='text' color='error'>
								Remover
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
