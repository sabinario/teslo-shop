import React from 'react';

import {
	Box,
	CircularProgress,
	Typography,
} from '../../shared/material-components';

export const FullLoading = () => {
	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			flexDirection='column'
			height='calc(100vh - 200px)'
			sx={{ textAlign: 'center' }}
		>
			<Typography sx={{ mb: 3 }} variant='h2' fontWeight={400} fontSize={24}>
				Cargando...
			</Typography>
			<CircularProgress thickness={4} />
		</Box>
	);
};
