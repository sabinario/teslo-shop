import React from 'react';

import { FullLoading, ProductList, ShopLayout } from 'components';
import { useProducts } from 'hooks';
import { GetStaticPaths, GetStaticProps } from 'next';
import { capitalize } from 'shared';

interface Props {
	gender: string;
}

const CategoryPage = ({ gender }: Props) => {
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
