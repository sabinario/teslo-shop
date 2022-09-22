import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';

import { ShopLayout } from '../../components/layouts';
import { ProductSizeSelector } from '../../components/products';
import { ProductSlideshow } from '../../components/products/ProductSlideshow';
import { ItemCounter } from '../../components/ui';
import { initialData } from '../../database/products';

const product = initialData.products[0];

const ProductPage = () => {
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
