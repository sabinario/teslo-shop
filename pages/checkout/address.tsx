import React, { useContext } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ShopLayout } from '../../components/layouts';
import { CartContext, getAddressFromCookies } from '../../context';
import {
	Box,
	Button,
	FormControl,
	Grid,
	MenuItem,
	TextField,
	Typography,
} from '../../shared';
import { countries, jwt } from '../../utils';

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
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: getAddressFromCookies(),
	});

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		console.log(data);

		updateAddress(data);
		router.push('/checkout/summary');
	};

	return (
		<ShopLayout
			title='Dirección'
			pageDescription='Confirmar dirección de destino'
		>
			<Typography variant='h1' component='h1'>
				Dirección
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
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
								minLength: {
									value: 2,
									message: 'Por favor ingresa la dirección para el envío',
								},
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
							{...register('address2', {
								required: false,
							})}
						/>
					</Grid>
					<Grid xs={12} sm={6}>
						<TextField
							fullWidth
							variant='outlined'
							label='Código Postal'
							{...register('zipCode', {
								required: 'Este campo es requerido',
								minLength: {
									value: 5,
									message: 'Ingresa un código postal',
								},
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
								minLength: {
									value: 2,
									message: 'Indica una ciudad de envío',
								},
							})}
							error={!!errors.city}
							helperText={errors.city?.message}
						/>
					</Grid>
					<Grid xs={12} sm={6}>
						<FormControl fullWidth>
							<TextField
								select
								variant='outlined'
								defaultValue={countries[0].code}
								label='País'
								{...register('country', {
									required: 'Este campo es requerido',
								})}
								error={!!errors.country}
							>
								{countries.map((country) => (
									<MenuItem key={country.code} value={country.code}>
										{country.name}
									</MenuItem>
								))}
							</TextField>
						</FormControl>
					</Grid>
					<Grid xs={12} sm={6}>
						<TextField
							fullWidth
							variant='outlined'
							label='Teléfono'
							{...register('phone', {
								required: 'Este campo es requerido',
								minLength: {
									value: 4,
									message: 'Por favor ingresa un nombre válido',
								},
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const { token = '' } = req.cookies;
	let isValidToken = false;

	try {
		await jwt.isValidToken(token);
		isValidToken = true;
	} catch (error) {
		isValidToken = false;
	}

	if (!isValidToken) {
		return {
			redirect: {
				destination: '/auth/login?p=/checkout/address',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default AddressPage;
