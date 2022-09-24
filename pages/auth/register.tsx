import React, { useContext, useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

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
	name: string;
};

const RegisterPage = () => {
	const router = useRouter();
	const { registerUser } = useContext(AuthContext);
	const [errorMessage, setErrorMessage] = useState('');
	const [showError, setShowError] = useState(false);

	const previusPage =
		(router.query.p?.toString() && `?p=${router.query.p.toString()}`) || '';

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	console.log('errors: ', errors);

	const onRegisterSend: SubmitHandler<FormData> = async ({
		email,
		password,
		name,
	}) => {
		setShowError(false);

		const { hasError, message } = await registerUser(name, email, password);

		if (hasError) {
			setShowError(true);

			setErrorMessage(message!);

			setTimeout(() => {
				setShowError(false);
			}, 3000);
			return;
		}

		router.replace('/');
	};

	return (
		<AuthLayout title='Ingresar'>
			<form onSubmit={handleSubmit(onRegisterSend)} noValidate>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid xs={12}>
							<Typography variant='h1' component='h1'>
								Crear cuenta
							</Typography>
							{showError && (
								<Chip
									label={errorMessage}
									icon={<ErrorOutlined />}
									color='error'
									className='fadeIn'
									sx={{ my: 2 }}
								/>
							)}
						</Grid>
						<Grid xs={12}>
							<TextField
								label='Nombre completo'
								variant='outlined'
								fullWidth
								type='text'
								{...register('name', {
									required: 'Este campo es requerido',
									minLength: {
										value: 2,
										message: 'El nombre debe tener al menos 2 caracteres',
									},
								})}
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
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
								Crear cuenta
							</Button>
						</Grid>
						<Grid xs={12} display='flex' justifyContent='end'>
							<NextLink href={`/auth/login${previusPage}`} passHref>
								<Link underline='always'>¿Ya tienes una cuenta?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export default RegisterPage;
