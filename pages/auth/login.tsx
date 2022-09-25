import React, { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import { getProviders, getSession, signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';

import { AuthLayout } from '../../components/layouts';
import {
	Box,
	Button,
	Chip,
	Divider,
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
	const [showError, setShowError] = useState(false);
	const [providers, setProviders] = useState<any>({});

	useEffect(() => {
		getProviders().then((prov) => {
			setProviders(prov);
		});
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
		setShowError(false);

		await signIn('credentials', { email, password });

		/* const isLogged = await loginUser(email, password);

		if (!isLogged) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 3000);
			return;
		}
		const destination = router.query.p?.toString() || '/';
		router.replace(`${destination}`); */
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
							<NextLink
								href={
									router.query.p
										? `/auth/register?p=${router.query.p}`
										: '/auth/register'
								}
								passHref
							>
								<Link underline='always'>¿No tienes cuenta?</Link>
							</NextLink>
						</Grid>

						<Grid
							xs={12}
							display='flex'
							justifyContent='end'
							flexDirection='column'
						>
							<Divider sx={{ width: '100%', mb: 2 }} />
							{Object.values(providers).map((provider: any) => {
								if (provider.id === 'credentials')
									return (
										<div key='credentials' style={{ display: 'none' }}></div>
									);

								return (
									<Button
										key={provider.id}
										variant='outlined'
										fullWidth
										color='primary'
										sx={{ mb: 1 }}
										onClick={() => signIn(provider.id)}
									>
										{provider.name}
									</Button>
								);
							})}
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const session = await getSession({ req });

	const { p = '/' } = query;

	if (session) {
		return {
			redirect: {
				destination: p.toString(),
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default LoginPage;
