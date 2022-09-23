import { useContext, useState } from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { ShopLayout } from '../../components/layouts';
import { ProductSizeSelector } from '../../components/products';
import { ProductSlideshow } from '../../components/products/ProductSlideshow';
import { ItemCounter } from '../../components/ui';
import { CartContext } from '../../context';
import { dbProducts } from '../../database';
import { ICartProduct, IProduct, ISize } from '../../interfaces';
import { Box, Button, Chip, Grid, Typography } from '../../shared';

interface Props {
	product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }: Props) => {
	const router = useRouter();
	const { addProduct } = useContext(CartContext);
	const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
		_id: product._id,
		image: product.images[0],
		price: product.price,
		size: undefined,
		slug: product.slug,
		title: product.title,
		gender: product.gender,
		quantity: 1,
	});

	const onSelectedSize = (size: ISize) => {
		setTempCartProduct((prev) => ({
			...prev,
			size,
		}));
	};

	const onQuantityChange = (quantity: number) => {
		setTempCartProduct((prev) => ({
			...prev,
			quantity,
		}));
	};

	const onAddProduct = () => {
		if (!tempCartProduct.size) return;

		addProduct(tempCartProduct);
		// router.push("/cart")
	};

	return (
		<ShopLayout title={product.title} pageDescription={product.description}>
			<Grid container spacing={4}>
				<Grid xs={12} sm={7}>
					<ProductSlideshow images={product.images} />
				</Grid>
				<Grid xs={12} sm={5}>
					<Box display='flex' flexDirection='column'>
						<Typography variant='h1' component='h1'>
							{product.title}
						</Typography>

						<Typography variant='subtitle1' component='h2'>
							{`$${product.price}`}
						</Typography>

						<Box sx={{ marginY: 2 }}>
							<Typography variant='subtitle2'>Cantidad</Typography>
							<ItemCounter
								currentQuantity={tempCartProduct.quantity}
								onQuantityChange={onQuantityChange}
								maxValue={product.inStock}
							/>
							<ProductSizeSelector
								selectedSize={tempCartProduct.size}
								sizes={product.sizes}
								onSelectSize={onSelectedSize}
							/>
						</Box>

						{product.inStock > 0 ? (
							<Button
								color='secondary'
								className='circular-btn'
								disabled={!tempCartProduct.size}
								onClick={onAddProduct}
							>
								{tempCartProduct.size
									? 'Agregar al carrito'
									: 'Seleccione una talla'}
							</Button>
						) : (
							<Chip
								label='No hay disponibles'
								color='error'
								variant='outlined'
							/>
						)}

						<Box sx={{ my: 2 }}>
							<Typography variant='subtitle2'>Descripción</Typography>
							<Typography variant='body2'>{product.description}</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const slugs = await dbProducts.getAllProductSlugs();

	return {
		paths: slugs.map(({ slug }) => ({
			params: { slug },
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params as { slug: string };

	const product = await dbProducts.getProductBySlug(slug);

	if (!product) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: { product },
		revalidate: 86400,
	};
};

/* export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { slug } = query as { slug: string };

	const product = await dbProducts.getProductBySlug(slug);

	if (!product) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			product: product,
		},
	};
}; */
