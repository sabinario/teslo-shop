import NextLink from 'next/link';

import { ShopLayout } from '../../components/layouts';
import {
	Box,
	Link,
	Typography,
	RemoveShoppingCartOutlined,
} from '../../shared';

const EmptyCartPage = () => {
	return (
		<ShopLayout
			title='Carrito vacío'
			pageDescription='No hay artículos en el carrito'
		>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='calc(100vh - 200px)'
				sx={{ flexDirection: { xs: 'column', sm: 'row' }, textAlign: 'center' }}
			>
				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					sx={{ gap: '12px' }}
				>
					<RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
					<Typography>Su carrito está vacío</Typography>
					<NextLink href='/' passHref>
						<Link typography='h4' color='secondary'>
							Regresar
						</Link>
					</NextLink>
				</Box>
			</Box>
		</ShopLayout>
	);
};

export default EmptyCartPage;
