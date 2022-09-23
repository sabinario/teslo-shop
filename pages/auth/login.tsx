import React from 'react';

import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';

import { AuthLayout } from '../../components/layouts';
import { Box, Button, Grid, Link, TextField, Typography } from '../../shared';

type FormData = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

	return (
		<AuthLayout title='Ingresar'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid xs={12}>
							<Typography variant='h1' component='h1'>
								Iniciar sesión
							</Typography>
						</Grid>
						<Grid xs={12}>
							<TextField
								label='Correo'
								variant='outlined'
								fullWidth
								type='email'
								{...register('email')}
							/>
						</Grid>
						<Grid xs={12}>
							<TextField
								label='Contraseña'
								type='password'
								variant='outlined'
								fullWidth
								{...register('password')}
							/>
						</Grid>
						<Grid xs={12}>
							<Button
								color='secondary'
								className='circular-btn'
								size='large'
								fullWidth
								type='submit'
							>
								Ingresar
							</Button>
						</Grid>
						<Grid xs={12} display='flex' justifyContent='end'>
							<NextLink href='/auth/register' passHref>
								<Link underline='always'>¿No tienes cuenta?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export default LoginPage;
