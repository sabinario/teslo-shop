import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullLoading } from '../../components/ui';
import { useProducts } from '../../hooks';
import { capitalize } from '../../shared';

interface Props {
	gender: string;
}

const CategoryPage = ({ gender }: Props) => {
	const router = useRouter();
	/* const { gender = 'all' } = router.query; */
	const { products, isLoading } = useProducts(`/products?gender=${gender}`);

	return (
		<ShopLayout
			title={`TesloShop - Category: ${capitalize(gender)}`}
			pageDescription={`Productos de la categoría ${capitalize(`${gender}`)}`}
		>
			{isLoading ? <FullLoading /> : <ProductList products={products} />}
		</ShopLayout>
	);
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	return {
		paths: [
			{ params: { gender: 'men' } },
			{ params: { gender: 'kid' } },
			{ params: { gender: 'women' } },
		],
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { gender } = params as { gender: string };
	return {
		props: { gender },
	};
};
