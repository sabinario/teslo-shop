import React from 'react';

import useSWR from 'swr';

import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridRowsProp,
} from '@mui/x-data-grid';

import { tesloApi } from '../../../api';
import { AdminLayout } from '../../../components/layouts';
import { IUser } from '../../../interfaces';
import { Grid, MenuItem, PeopleOutline, Select } from '../../../shared';

const UsersPage = () => {
	const { data, error, mutate } = useSWR<IUser[]>('/api/admin/users');

	if (!data && !error) {
		return <></>;
	}

	const onRoleUpdated = async (userId: string, newRole: string) => {
		try {
			await tesloApi.put('/admin/users', {
				userId,
				role: newRole,
			});
			mutate(
				data!.map((user) =>
					user._id === userId ? { ...user, role: newRole } : user
				)
			);
		} catch (error) {
			console.log(error);
		}
	};

	const rows: GridRowsProp = data!.map((user) => ({
		id: user._id,
		email: user.email,
		name: user.name,
		role: user.role,
	}));

	const columns: GridColDef[] = [
		{ field: 'email', headerName: 'Correo', width: 250 },
		{ field: 'name', headerName: 'Nombre completo', width: 300 },
		{
			field: 'role',
			headerName: 'Rol',
			width: 300,
			renderCell: ({ row }: GridRenderCellParams) => {
				return (
					<Select
						variant='outlined'
						value={row.role}
						sx={{ width: 300, height: 42 }}
						onChange={(e) => onRoleUpdated(row.id, e.target.value)}
					>
						<MenuItem value='admin'>Admin</MenuItem>
						<MenuItem value='client'>Cliente</MenuItem>
						<MenuItem value='super-user'>Super-User</MenuItem>
					</Select>
				);
			},
		},
	];

	return (
		<AdminLayout
			title='Usuarios'
			subTitle='Mantenimiento de usuarios'
			icon={<PeopleOutline sx={{ ml: 2, fontSize: 32 }} />}
		>
			<Grid container>
				<Grid xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} rowHeight={64} />
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export default UsersPage;
