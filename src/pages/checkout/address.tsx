import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { FormHelperText } from '@mui/material';

import { ShopLayout } from 'components/layouts';
import { CartContext, getAddressFromCookies } from 'context';
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
} from 'shared';
import { countries } from 'utils';

interface FormData {
	firstName: string;
	lastname: string;
	address: string;
	address2?: string;
	zipCode: string;
	city: string;
	country: string;
	phone: string;
}

const AddressPage = () => {
	const { updateAddress } = useContext(CartContext);
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		defaultValues: {
			firstName: '',
			lastname: '',
			address: '',
			address2: '',
			zipCode: '',
			city: '',
			country: countries[0].code,
			phone: '',
		},
	});

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		updateAddress(data);
		router.push('/checkout/summary');
	};

	useEffect(() => {
		reset(getAddressFromCookies());
	}, [reset]);

	return (
		<ShopLayout
			title='Dirección'
			pageDescription='Confirmar dirección de destino'
		>
			<Typography variant='h1' component='h1'>
				Dirección
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid xs={12} sm={6}>
						<TextField
							fullWidth
							variant='outlined'
							label='Nombre'
							{...register('firstName', {
								required: 'Este campo es requerido',
							})}
							error={!!errors.firstName}
							helperText={errors.firstName?.message}
						/>
					</Grid>
					<Grid xs={12} sm={6}>
						<TextField
							fullWidth
							variant='outlined'
							label='Apellido'
							{...register('lastname', {
								required: 'Este campo es requerido',
								minLength: {
									value: 2,
									message: 'El apellido debe tener al menos 2 caracteres',
								},
							})}
							error={!!errors.lastname}
							helperText={errors.lastname?.message}
						/>
					</Grid>
					<Grid xs={12} sm={6}>
						<TextField
							fullWidth
							variant='outlined'
							label='Dirección'
							{...register('address', {
								required: 'Este campo es requerido',
							})}
							error={!!errors.address}
							helperText={errors.address?.message}
						/>
					</Grid>
					<Grid xs={12} sm={6}>
						<TextField
							fullWidth
							variant='outlined'
							label='Dirección 2 (opcional)'
							{...register('address2')}
						/>
					</Grid>
					<Grid xs={12} sm={6}>
						<TextField
							fullWidth
							variant='outlined'
							label='Código Postal'
							{...register('zipCode', {
								required: 'Este campo es requerido',
							})}
							error={!!errors.zipCode}
							helperText={errors.zipCode?.message}
						/>
					</Grid>
					<Grid xs={12} sm={6}>
						<TextField
							fullWidth
							variant='outlined'
							label='Ciudad'
							{...register('city', {
								required: 'Este campo es requerido',
							})}
							error={!!errors.city}
							helperText={errors.city?.message}
						/>
					</Grid>
					<Grid xs={12} sm={6}>
						<Controller
							name='country'
							control={control}
							defaultValue={countries[0].code}
							rules={{ required: 'Este campo es requerido' }}
							render={({ field }) => (
								<FormControl fullWidth error={!!errors.country}>
									<InputLabel>Country</InputLabel>
									<Select {...field} label='Country'>
										{countries.map((country) => (
											<MenuItem key={country.code} value={country.code}>
												{country.name}
											</MenuItem>
										))}
									</Select>
									<FormHelperText>{errors.country?.message}</FormHelperText>
								</FormControl>
							)}
						/>
					</Grid>
					<Grid xs={12} sm={6}>
						<TextField
							fullWidth
							variant='outlined'
							label='Teléfono'
							{...register('phone', {
								required: 'Este campo es requerido',
							})}
							error={!!errors.phone}
							helperText={errors.phone?.message}
						/>
					</Grid>
				</Grid>

				<Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
					<Button
						color='secondary'
						className='circular-btn'
						size='large'
						type='submit'
					>
						Revisar pedido
					</Button>
				</Box>
			</form>
		</ShopLayout>
	);
};

export default AddressPage;
