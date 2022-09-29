import React from 'react';

import useSWR from 'swr';

import { DataGrid } from '@mui/x-data-grid/DataGrid';
import {
	GridColDef,
	GridRenderCellParams,
	GridRowsProp,
} from '@mui/x-data-grid/models';

import { AdminLayout } from '../../../components/layouts';
import { IOrder, IUser } from '../../../interfaces';
import {
	Chip,
	ConfirmationNumberOutlined,
	Grid,
	Typography,
} from '../../../shared';
import { currency } from '../../../utils';

const OrdersPage = () => {
	const { data, error, mutate } = useSWR<IOrder[]>('/api/admin/orders');

	if (!data && !error) {
		return <></>;
	}

	const rows: GridRowsProp = data!.map((order) => ({
		id: order._id,
		email: (order.user as IUser).email,
		name: (order.user as IUser).name,
		total: order.total,
		isPaid: order.isPaid,
		nProductos: order.numberOfItems,
		createdAt: order.createdAt,
	}));

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'Orden ID', headerAlign: 'center', width: 250 },
		{ field: 'email', headerName: 'Correo', headerAlign: 'center', width: 150 },
		{
			field: 'name',
			headerName: 'Nombre completo',
			headerAlign: 'center',
			width: 200,
		},
		{
			field: 'total',
			headerName: 'Monto total',
			headerAlign: 'center',
			width: 150,
			align: 'center',
			renderCell: ({ row }: GridRenderCellParams) => {
				return <Typography>{currency.formatCurrency(row.total)}</Typography>;
			},
		},
		{
			field: 'isPaid',
			headerName: 'Pagada',
			width: 150,
			headerAlign: 'center',
			align: 'center',
			renderCell: ({ row }: GridRenderCellParams) => {
				return row.isPaid ? (
					<Chip
						variant='outlined'
						label='Pagada'
						color='success'
						sx={{ width: '80%' }}
					/>
				) : (
					<Chip
						variant='outlined'
						label='Pendiente'
						color='error'
						sx={{ width: '80%' }}
					/>
				);
			},
		},
		{
			field: 'nProductos',
			headerName: 'Cantidad de productos',
			headerAlign: 'center',
			align: 'center',
			width: 225,
		},
		{
			field: 'check',
			headerName: 'Ver orden',
			headerAlign: 'center',

			width: 150,
			renderCell: ({ row }: GridRenderCellParams) => {
				return (
					<a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
						Ver orden
					</a>
				);
			},
		},
		{
			field: 'createdAt',
			width: 150,
			headerAlign: 'center',
			align: 'center',
			headerName: 'Creada en:',
			renderCell: ({ row }: GridRenderCellParams) => {
				return (
					<Typography>{`${new Date(row.createdAt).toLocaleDateString(
						'ES-pe'
					)}`}</Typography>
				);
			},
		},
	];

	return (
		<AdminLayout
			title='Ordenes'
			subTitle='Resumen de ordenes'
			icon={<ConfirmationNumberOutlined sx={{ fontSize: 32, ml: 2 }} />}
		>
			<Grid container>
				<Grid xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} rowHeight={64} />
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export default OrdersPage;
