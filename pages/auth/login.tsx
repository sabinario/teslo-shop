import React from 'react';

import NextLink from 'next/link';

import { AuthLayout } from '../../components/layouts';
import { Box, Button, Grid, Link, TextField, Typography } from '../../shared';

const LoginPage = () => {
	return (
		<AuthLayout title='Ingresar'>
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
		</AuthLayout>
	);
};

export default LoginPage;
