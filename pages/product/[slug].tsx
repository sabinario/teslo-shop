import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { ShopLayout } from '../../components/layouts';
import { ProductSizeSelector } from '../../components/products';
import { ProductSlideshow } from '../../components/products/ProductSlideshow';
import { ItemCounter } from '../../components/ui';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';
import { Box, Button, Grid, Typography } from '../../shared';

interface Props {
	product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }: Props) => {
	// const router = useRouter();
	// const { slug } = router.query;
	// const { products: product, isLoading } = useProducts(`/products/${slug}`);
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
							<ItemCounter />
							<ProductSizeSelector
								// selectedSize={product.sizes[0]}
								sizes={product.sizes}
							/>
						</Box>

						<Button color='secondary' className='circular-btn'>
							Agregar al carrito
						</Button>

						{/* <Chip label='No hay disponibles' color='error' variant='outlined' /> */}

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
