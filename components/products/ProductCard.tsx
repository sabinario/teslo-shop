import React, { useMemo, useState } from 'react';

import NextLink from 'next/link';

import {
	Box,
	Card,
	CardActionArea,
	CardMedia,
	Link,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { IProduct } from '../../interfaces';

interface Props {
	product: IProduct;
}

export const ProductCard = ({ product }: Props) => {
	const [isHovered, setIsHovered] = useState(false);

	const productImage = useMemo(() => {
		return isHovered
			? `products/${product.images[0]}`
			: `products/${product.images[1]}`;
	}, [isHovered, product.images]);

	return (
		<Grid
			xs={6}
			sm={4}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Card>
				<NextLink href={`product/${product.slug}`} passHref prefetch={false}>
					<Link>
						<CardActionArea>
							<CardMedia
								component='img'
								image={productImage}
								alt={product.title}
								className='fadeIn'
							/>
						</CardActionArea>
					</Link>
				</NextLink>
			</Card>
			<Box sx={{ mt: 1 }} className='fadeIn'>
				<Typography fontWeight={700}>{product.title}</Typography>
				<Typography fontWeight={500}>{`$${product.price}`}</Typography>
			</Box>
		</Grid>
	);
};
