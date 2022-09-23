import React from 'react';

import { ShopLayout } from '../../components/layouts';
import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '../../shared';

const AddressPage = () => {
	return (
		<ShopLayout
			title='Dirección'
			pageDescription='Confirmar dirección de destino'
		>
			<Typography variant='h1' component='h1'>
				Dirección
			</Typography>
			<Grid container spacing={2} sx={{ mt: 2 }}>
				<Grid xs={12} sm={6}>
					<TextField fullWidth variant='outlined' label='Nombre' />
				</Grid>
				<Grid xs={12} sm={6}>
					<TextField fullWidth variant='outlined' label='Apellido' />
				</Grid>
				<Grid xs={12} sm={6}>
					<TextField fullWidth variant='outlined' label='Dirección' />
				</Grid>
				<Grid xs={12} sm={6}>
					<TextField
						fullWidth
						variant='outlined'
						label='Dirección 2 (opcional)'
					/>
				</Grid>
				<Grid xs={12} sm={6}>
					<TextField fullWidth variant='outlined' label='Código Postal' />
				</Grid>
				<Grid xs={12} sm={6}>
					<TextField fullWidth variant='outlined' label='Ciudad' />
				</Grid>
				<Grid xs={12} sm={6}>
					<FormControl fullWidth>
						<InputLabel>País</InputLabel>
						<Select variant='outlined' label='País' value={1}>
							<MenuItem value={1}>Perú</MenuItem>
							<MenuItem value={2}>Colombia</MenuItem>
							<MenuItem value={3}>Chile</MenuItem>
							<MenuItem value={4}>México</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid xs={12} sm={6}>
					<TextField fullWidth variant='outlined' label='Teléfono' />
				</Grid>
			</Grid>

			<Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
				<Button color='secondary' className='circular-btn' size='large'>
					Revisar pedido
				</Button>
			</Box>
		</ShopLayout>
	);
};

export default AddressPage;
