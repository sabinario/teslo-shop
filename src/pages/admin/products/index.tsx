import React from 'react';

import { AdminLayout } from 'components';
import { IProduct } from 'interfaces';
import NextLink from 'next/link';
import {
	Box,
	Button,
	capitalize,
	CardMedia,
	CategoryOutlined,
	Grid,
	Link,
} from 'shared';
import useSWR from 'swr';
import { currency } from 'utils';

import { AddOutlined } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import {
	GridColDef,
	GridRenderCellParams,
	GridRowsProp,
} from '@mui/x-data-grid/models';

const ProductsPage = () => {
	const { data, error } = useSWR<IProduct[]>('/api/admin/products');

	if (!data && !error) {
		return <></>;
	}

	const rows: GridRowsProp = data!.map((product) => ({
		id: product._id,
		img: product.images[0],
		title: product.title,
		gender: capitalize(`${product.gender}`),
		type: product.type,
		inStock: product.inStock,
		price: currency.formatCurrency(product.price),
		sizes: product.sizes.join(', '),
		slug: product.slug,
	}));

	const columns: GridColDef[] = [
		{
			field: 'img',
			headerName: 'Foto',
			width: 100,
			headerAlign: 'center',
			align: 'center',
			renderCell: ({ row }: GridRenderCellParams) => {
				return (
					<a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
						<CardMedia
							component='img'
							alt={row.title}
							className='fadeIn'
							image={row.img}
							sx={{ height: '56px', borderRadius: '6px' }}
						/>
					</a>
				);
			},
		},
		{
			field: 'title',
			headerName: 'Nombre',
			width: 300,
			renderCell: ({ row }: GridRenderCellParams) => {
				return (
					<NextLink href={`/admin/products/${row.slug}`} passHref>
						<Link underline='always'>{row.title}</Link>
					</NextLink>
				);
			},
		},
		{ field: 'gender', headerName: 'Género', width: 150 },
		{ field: 'type', headerName: 'Tipo', width: 150 },
		{ field: 'inStock', headerName: 'Inventario', width: 150 },
		{ field: 'price', headerName: 'Precio', width: 150 },
		{ field: 'sizes', headerName: 'Tallas', width: 150 },
	];

	return (
		<AdminLayout
			title={`Productos (${data?.length})`}
			subTitle='Mantenimiento de productos'
			icon={<CategoryOutlined sx={{ fontSize: 32, ml: 2 }} />}
		>
			<Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
				<Button
					color='secondary'
					startIcon={<AddOutlined />}
					href='/admin/products/new'
				>
					Crear producto
				</Button>
			</Box>
			<Grid container>
				<Grid xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} rowHeight={64} />
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export default ProductsPage;
