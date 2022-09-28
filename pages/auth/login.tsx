import { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import { getProviders, getSession, signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

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
	ErrorOutlined,
} from '../../shared';

type FormData = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormData>();

	const [showError, setShowError] = useState(false);

	const [providers, setProviders] = useState<any>({});

	useEffect(() => {
		getProviders().then((prov) => {
			setProviders(prov);
		});
	}, []);

	const onLoginUser = async ({ email, password }: FormData) => {
		setShowError(false);

		// const isValidLogin = await loginUser( email, password );
		// if ( !isValidLogin ) {
		//     setShowError(true);
		//     setTimeout(() => setShowError(false), 3000);
		//     return;
		// }
		// // Todo: navegar a la pantalla que el usuario estaba
		// const destination = router.query.p?.toString() || '/';
		// router.replace(destination);
		await signIn('credentials', { email, password });
	};

	return (
		<AuthLayout title={'Ingresar'}>
			<form onSubmit={handleSubmit(onLoginUser)} noValidate>
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
							<Controller
								name='email'
								control={control}
								rules={{ required: 'Este campo es requerido' }}
								defaultValue={''}
								render={({ field }) => (
									<TextField
										type='email'
										label='Correo'
										value={field.value}
										onChange={field.onChange}
										variant='outlined'
										fullWidth
										error={!!errors.email}
										helperText={errors.email?.message}
									/>
								)}
							/>
						</Grid>
						<Grid xs={12}>
							<Controller
								name='password'
								control={control}
								rules={{
									required: 'Este campo es requerido',
									minLength: { value: 6, message: 'Mínimo 6 caracteres' },
								}}
								defaultValue={''}
								render={({ field }) => (
									<TextField
										type='password'
										label='Contraseña'
										value={field.value}
										onChange={field.onChange}
										variant='outlined'
										fullWidth
										error={!!errors.password}
										helperText={errors.password?.message}
									/>
								)}
							/>
						</Grid>

						<Grid xs={12}>
							<Button
								type='submit'
								color='secondary'
								className='circular-btn'
								size='large'
								fullWidth
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
							flexDirection='column'
							justifyContent='end'
						>
							<Divider sx={{ width: '100%', mb: 2 }} />
							{Object.values(providers).map((provider: any) => {
								if (provider.id === 'credentials')
									return <Box key='credentials' sx={{ display: 'none' }}></Box>;

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
