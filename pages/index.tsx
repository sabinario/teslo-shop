import type { NextPage } from 'next';

import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { FullLoading } from '../components/ui';
import { useProducts } from '../hooks';
import { Typography } from '../shared';

const HomePage: NextPage = () => {
	const { products, isLoading } = useProducts('/products');

	return (
		<ShopLayout
			title={'Teslo-Shop - Home'}
			pageDescription={'Encuentra los mejores productos de Teslo aquí'}
		>
			<Typography variant='h1' component='h1'>
				Tienda
			</Typography>
			<Typography variant='h2' sx={{ mb: 1 }}>
				Todos los productos
			</Typography>

			{isLoading ? <FullLoading /> : <ProductList products={products} />}
		</ShopLayout>
	);
};

export default HomePage;
