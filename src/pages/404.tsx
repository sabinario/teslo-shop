import { ShopLayout } from 'components/layouts';
import { Box, Typography } from 'shared';

const Custom404 = () => {
	return (
		<ShopLayout
			title='Page not found'
			pageDescription='No hay nada que mostrar aquí'
		>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='calc(100vh - 200px)'
				sx={{ flexDirection: { xs: 'column', sm: 'row' }, textAlign: 'center' }}
			>
				<Typography variant='h1' component='h1' fontSize={60} fontWeight={200}>
					404 |
				</Typography>
				<Typography marginLeft={2}>No encontramos ninguna página</Typography>
			</Box>
		</ShopLayout>
	);
};

export default Custom404;
