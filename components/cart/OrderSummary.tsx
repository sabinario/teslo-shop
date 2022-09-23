import React, { useContext } from 'react';

import { CartContext } from '../../context';
import { Grid, Typography } from '../../shared/material-components';
import { currency } from '../../utils';

export const OrderSummary = () => {
	const { numberOfItems, subtotal, tax, total } = useContext(CartContext);
	return (
		<Grid container spacing={0}>
			<Grid xs={6}>
				<Typography>N° Products</Typography>
			</Grid>
			<Grid xs={6} display='flex' justifyContent='end'>
				<Typography>
					{numberOfItems} {numberOfItems > 1 ? 'productos' : 'producto'}
				</Typography>
			</Grid>
			<Grid xs={6}>
				<Typography>Subtotal</Typography>
			</Grid>
			<Grid xs={6} display='flex' justifyContent='end'>
				<Typography>{currency.formatCurrency(subtotal)}</Typography>
			</Grid>
			<Grid xs={6}>
				<Typography>
					Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
				</Typography>
			</Grid>
			<Grid xs={6} display='flex' justifyContent='end'>
				<Typography>{currency.formatCurrency(tax)}</Typography>
			</Grid>
			<Grid xs={6} sx={{ mt: 2 }}>
				<Typography variant='subtitle1'>Total:</Typography>
			</Grid>
			<Grid xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
				<Typography variant='subtitle1'>
					{currency.formatCurrency(total)}
				</Typography>
			</Grid>
		</Grid>
	);
};
