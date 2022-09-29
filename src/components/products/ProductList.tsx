import { ProductCard } from 'components';
import { IProduct } from 'interfaces';
import { Grid } from 'shared/material-components';

interface Props {
	products: IProduct[];
}

export const ProductList = ({ products }: Props) => {
	return (
		<Grid container spacing={4}>
			{products.map((product) => (
				<ProductCard product={product} key={product.slug} />
			))}
		</Grid>
	);
};
