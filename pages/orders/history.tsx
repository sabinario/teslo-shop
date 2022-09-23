import React from 'react';

import NextLink from 'next/link';

import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridRowsProp,
} from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';
import { Chip, Grid, Link, Typography } from '../../shared';

const rows: GridRowsProp = [
	{ id: 1, paid: false, fullname: 'Sabino Fernandez' },
	{ id: 2, paid: true, fullname: 'Jorge Torres' },
	{ id: 3, paid: false, fullname: 'Sebastian Arias' },
];

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'fullname', headerName: 'Nombre completo', width: 300 },
	{
		field: 'paid',
		headerName: 'Orden pagada',
		width: 300,
		description: 'Muestra información sobre el estatus de la orden',
		renderCell: (params: GridRenderCellParams) => {
			return params.row.paid ? (
				<Chip color='success' label='Pagada' variant='outlined' />
			) : (
				<Chip color='error' label='No pagada' variant='outlined' />
			);
		},
	},
	{
		field: 'orden',
		headerName: 'Ver orden',
		width: 300,
		description: 'Muestra información sobre el estatus de la orden',
		renderCell: (params: GridRenderCellParams) => {
			return (
				<NextLink href={`/orders/${params.row.id}`} passHref>
					<Link underline='always'>Ver orden</Link>
				</NextLink>
			);
		},
		sortable: false,
	},
];

const HistoryPage = () => {
	return (
		<ShopLayout
			title='Historial de ordenes'
			pageDescription='Historial de ordenes del cliente'
		>
			<Typography>Historial de ordenes</Typography>
			<Grid container>
				<Grid xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} />
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default HistoryPage;
