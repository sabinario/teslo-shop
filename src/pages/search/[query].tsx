import type { NextPage } from 'next';
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';

import { ShopLayout } from 'components/layouts';
import { ProductList } from 'components/products';
import { dbProducts } from 'database';
import { IProduct } from 'interfaces';
import { Box, Typography } from 'shared';

interface Props {
	products: IProduct[];
	foundProducts: boolean;
	query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
	return (
		<ShopLayout
			title={'Teslo-Shop - Search'}
			pageDescription={'Encuentra los mejores productos de Teslo aquí'}
		>
			<Typography variant='h1' component='h1'>
				Buscar producto
			</Typography>

			{foundProducts ? (
				<Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>
					Búsqueda: {query}
				</Typography>
			) : (
				<Box display='flex' sx={{ my: 2 }}>
					<Typography variant='h2'>
						No se encontro ningún producto con el término:
					</Typography>
					<Typography
						variant='h2'
						sx={{ ml: 1 }}
						color='secondary'
						textTransform='capitalize'
					>
						{query}
					</Typography>
				</Box>
			)}

			<ProductList products={products} />
		</ShopLayout>
	);
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { query = '' } = params as { query: string };

	if (!query.length) {
		return {
			redirect: {
				destination: '/',
				permanent: true,
			},
		};
	}

	let products = await dbProducts.getProductsByQuery(query);

	const foundProducts = products.length > 0;

	if (!foundProducts) {
		products = await dbProducts.getAllProducts();
	}

	return {
		props: {
			products,
			foundProducts,
			query,
		},
	};
};
