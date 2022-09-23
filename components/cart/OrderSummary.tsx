import React from 'react';

import { Grid, Typography } from '../../shared/material-components';

export const OrderSummary = () => {
	return (
		<Grid container>
			<Grid xs={6}>
				<Typography>No Products</Typography>
			</Grid>
			<Grid xs={6} display='flex' justifyContent='end'>
				<Typography>3 items</Typography>
			</Grid>
			<Grid xs={6}>
				<Typography>Subtotal</Typography>
			</Grid>
			<Grid xs={6} display='flex' justifyContent='end'>
				<Typography>{`$${155.36}`}</Typography>
			</Grid>
			<Grid xs={6}>
				<Typography>Impuestos (18%)</Typography>
			</Grid>
			<Grid xs={6} display='flex' justifyContent='end'>
				<Typography>{`$${27.96}`}</Typography>
			</Grid>
			<Grid xs={6} sx={{ mt: 2 }}>
				<Typography variant='subtitle1'>Total:</Typography>
			</Grid>
			<Grid xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
				<Typography variant='subtitle1'>{`$${183.32}`}</Typography>
			</Grid>
		</Grid>
	);
};
