import React from 'react';

import NextLink from 'next/link';

import { AuthLayout } from '../../components/layouts';
import { Box, Button, Grid, Link, TextField, Typography } from '../../shared';

const RegisterPage = () => {
	return (
		<AuthLayout title='Ingresar'>
			<Box sx={{ width: 350, padding: '10px 20px' }}>
				<Grid container spacing={2}>
					<Grid xs={12}>
						<Typography variant='h1' component='h1'>
							Crear cuenta
						</Typography>
					</Grid>
					<Grid xs={12}>
						<TextField
							label='Nombre completo'
							variant='outlined'
							fullWidth
							type='text'
						/>
					</Grid>
					<Grid xs={12}>
						<TextField
							label='Correo'
							variant='outlined'
							fullWidth
							type='email'
						/>
					</Grid>
					<Grid xs={12}>
						<TextField
							label='Contraseña'
							type='password'
							variant='outlined'
							fullWidth
						/>
					</Grid>
					<Grid xs={12}>
						<Button
							color='secondary'
							className='circular-btn'
							size='large'
							fullWidth
						>
							Crear cuenta
						</Button>
					</Grid>
					<Grid xs={12} display='flex' justifyContent='end'>
						<NextLink href='/auth/login' passHref>
							<Link underline='always'>¿Ya tienes una cuenta?</Link>
						</NextLink>
					</Grid>
				</Grid>
			</Box>
		</AuthLayout>
	);
};

export default RegisterPage;
