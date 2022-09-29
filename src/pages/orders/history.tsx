import React from 'react';

import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';

import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridRowsProp,
} from '@mui/x-data-grid';

import { ShopLayout } from 'components/layouts';
import { dbOrders } from 'database';
import { IOrder } from 'interfaces';
import { Chip, Grid, Link, Typography } from 'shared';

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
				<NextLink href={`/orders/${params.row.orden}`} passHref>
					<Link underline='always'>Ver orden</Link>
				</NextLink>
			);
		},
		sortable: false,
	},
];

interface Props {
	orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }: Props) => {
	const rows: GridRowsProp = orders.map((order, index) => ({
		id: index + 1,
		paid: order.isPaid,
		fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastname}`,
		orden: order._id,
	}));

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session: any = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: `/auth/login?p=/orders/history`,
				permanent: false,
			},
		};
	}

	const orders = await dbOrders.getOrdersByUser(session.user._id);

	return {
		props: {
			orders,
		},
	};
};

export default HistoryPage;
