import type { NextPage } from 'next';

import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { initialData } from '../database/products';

const Home: NextPage = () => {
	return (
		<ShopLayout
			title={'Teslo-Shop - Home'}
			pageDescription={'Entro los mejores productos de Testlo aquí'}
		>
			<Typography variant='h1' component='h1'>
				Tienda
			</Typography>
			<Typography variant='h2' sx={{ mb: 1 }}>
				Todos los productos
			</Typography>

			<ProductList products={initialData.products as any} />
		</ShopLayout>
	);
};

export default Home;
