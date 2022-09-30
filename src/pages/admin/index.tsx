import React, { useEffect, useState } from 'react';

import { SummaryTile } from 'components/admin';
import { AdminLayout } from 'components/layouts';
import { DashboardSummaryResponse } from 'interfaces';
import {
	AccessTimeOutlined,
	AttachMoneyOutlined,
	CancelPresentationOutlined,
	CategoryOutlined,
	CreditCardOffOutlined,
	CreditCardOutlined,
	DashboardOutlined,
	Grid,
	GroupOutlined,
	ProductionQuantityLimitsOutlined,
	Typography,
} from 'shared';
import useSWR from 'swr';

const DashboardPage = () => {
	const { data, error } = useSWR<DashboardSummaryResponse>(
		`/api/admin/dashboard`,
		{
			refreshInterval: 30 * 1000,
		}
	);

	const [refreshIn, setRefreshIn] = useState(30);

	useEffect(() => {
		const interval = setInterval(() => {
			setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	if (!error && !data) {
		return <></>;
	}

	if (error) {
		console.log(error);
		return <Typography>Error al cargar la información</Typography>;
	}

	const {
		paidOrders,
		notPaidOrders,
		numberOfClients,
		numberOfOrders,
		numberOfProducts,
		productsWithNoStock,
		lowInventory,
	} = data!;

	return (
		<AdminLayout
			title='Dashboard'
			subTitle='Estadisticas generales'
			icon={<DashboardOutlined sx={{ ml: 2, fontSize: 32 }} />}
		>
			<Grid container spacing={2}>
				<SummaryTile
					title={numberOfOrders}
					subtitle='Ordenes totales'
					icon={
						<CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />
					}
				/>
				<SummaryTile
					title={paidOrders}
					subtitle='Ordenes pagadas'
					icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={notPaidOrders}
					subtitle='Ordenes pendientes'
					icon={<CreditCardOutlined color='error' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={numberOfClients}
					subtitle='Clientes'
					icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={numberOfProducts}
					subtitle='Productos'
					icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={productsWithNoStock}
					subtitle='Sin existencias'
					icon={
						<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />
					}
				/>
				<SummaryTile
					title={lowInventory}
					subtitle='Bajo inventario'
					icon={
						<ProductionQuantityLimitsOutlined
							color='warning'
							sx={{ fontSize: 40 }}
						/>
					}
				/>
				<SummaryTile
					title={refreshIn}
					subtitle='Actualización en:'
					icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
				/>
			</Grid>
		</AdminLayout>
	);
};

export default DashboardPage;
