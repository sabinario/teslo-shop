import React, { useContext, useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';

import { AuthLayout } from '../../components/layouts';
import { AuthContext } from '../../context';
import {
	Box,
	Button,
	Chip,
	Grid,
	Link,
	TextField,
	Typography,
} from '../../shared';
import { ErrorOutlined } from '../../shared/material-icons';
import { validations } from '../../utils';

type FormData = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const router = useRouter();
	const { loginUser } = useContext(AuthContext);
	const [showError, setShowError] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
		setShowError(false);

		const isLogged = await loginUser(email, password);

		if (!isLogged) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 3000);
			return;
		}
		router.replace('/');
	};

	return (
		<AuthLayout title='Ingresar'>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid xs={12}>
							<Typography variant='h1' component='h1'>
								Iniciar sesión
							</Typography>
							{showError && (
								<Chip
									label='No se reconoce el usuario / contraseña'
									icon={<ErrorOutlined />}
									color='error'
									className='fadeIn'
								/>
							)}
						</Grid>
						<Grid xs={12}>
							<TextField
								label='Correo'
								variant='outlined'
								fullWidth
								type='email'
								{...register('email', {
									required: 'Este campo es requerido',
									validate: validations.isEmail,
								})}
								error={!!errors.email}
								helperText={errors.email?.message}
							/>
						</Grid>
						<Grid xs={12}>
							<TextField
								label='Contraseña'
								type='password'
								variant='outlined'
								fullWidth
								{...register('password', {
									required: 'Este campo es requerido',
									minLength: { value: 6, message: 'Mínimo 6 carácteres' },
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
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
