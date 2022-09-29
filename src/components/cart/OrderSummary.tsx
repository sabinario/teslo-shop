import React, { useContext } from 'react';

import { CartContext } from 'context';
import { IOrder } from 'interfaces';
import { Grid, Typography } from 'shared/material-components';
import { currency } from 'utils';

interface Props {
	orderData?: IOrder;
}

export const OrderSummary = ({ orderData }: Props) => {
	const { numberOfItems, subtotal, total, tax } = useContext(CartContext);

	const summaryValues = orderData
		? orderData
		: { numberOfItems, subtotal, total, tax };

	return (
		<Grid container spacing={0}>
			<Grid xs={6}>
				<Typography>N° Products</Typography>
			</Grid>
			<Grid xs={6} display='flex' justifyContent='end'>
				<Typography>
					{summaryValues.numberOfItems}{' '}
					{summaryValues.numberOfItems > 1 ? 'productos' : 'producto'}
				</Typography>
			</Grid>
			<Grid xs={6}>
				<Typography>Subtotal</Typography>
			</Grid>
			<Grid xs={6} display='flex' justifyContent='end'>
				<Typography>
					{currency.formatCurrency(summaryValues.subtotal)}
				</Typography>
			</Grid>
			<Grid xs={6}>
				<Typography>
					Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
				</Typography>
			</Grid>
			<Grid xs={6} display='flex' justifyContent='end'>
				<Typography>{currency.formatCurrency(summaryValues.tax)}</Typography>
			</Grid>
			<Grid xs={6} sx={{ mt: 2 }}>
				<Typography variant='subtitle1'>Total:</Typography>
			</Grid>
			<Grid xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
				<Typography variant='subtitle1'>
					{currency.formatCurrency(summaryValues.total)}
				</Typography>
			</Grid>
		</Grid>
	);
};
