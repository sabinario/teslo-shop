import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { tesloApi } from 'api';
import { AdminLayout } from 'components';
import { dbProducts } from 'database';
import { IProduct } from 'interfaces';
import { Product } from 'models';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import {
	Box,
	Button,
	capitalize,
	Card,
	CardActions,
	CardMedia,
	Checkbox,
	Chip,
	Divider,
	DriveFileRenameOutline,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	SaveOutlined,
	TextField,
	UploadOutlined,
} from 'shared';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface Props {
	product: IProduct;
}

interface FormData {
	_id?: string;
	description: string;
	images: string[];
	inStock: number;
	price: number;
	sizes: string[];
	slug: string;
	tags: string[];
	title: string;
	type: string;
	gender: string;
}

const ProductAdminPage = ({ product }: Props) => {
	const router = useRouter();
	const [newTagValue, setNewTagValue] = useState('');
	const [isSaving, setIsSaving] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: product,
	});

	const onNewTag = () => {
		const newTag = newTagValue.trim().toLowerCase();
		setNewTagValue('');
		const currentTags = getValues('tags');

		if (currentTags.includes(newTag)) {
			return;
		}

		currentTags.push(newTag);
		// setValue("tags", currentTags)
	};

	const onDeleteTag = (tag: string) => {
		const updatedTags = getValues('tags').filter((t) => t !== tag);

		setValue('tags', updatedTags, { shouldValidate: true });
	};

	const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (!target.files || target.files.length === 0) {
			return;
		}
		try {
			for (const file of target.files) {
				const formData = new FormData();
				formData.append('file', file);
				const { data } = await tesloApi.post<{ message: string }>(
					'/admin/upload',
					formData
				);
				setValue('images', [...getValues('images'), data.message], {
					shouldValidate: true,
				});
			}
		} catch (error) {}
	};

	const onDeleteImage = (image: string) => {
		setValue(
			'images',
			getValues('images').filter((img) => img !== image),
			{
				shouldValidate: true,
			}
		);
	};

	const onSubmit = async (formData: FormData) => {
		if (formData.images.length < 2) {
			return alert('Minimo 2 imagenes');
		}
		setIsSaving(true);
		try {
			const { data } = await tesloApi({
				url: '/admin/products',
				method: formData._id ? 'PUT' : 'POST', // Si tenemos un _id, actualizar, sino crear
				data: formData,
			});

			if (!formData._id) {
				router.replace(`/admin/products/${formData.slug}`);
			} else {
				setIsSaving(false);
			}
		} catch (error) {
			console.log(error);
		}
		setIsSaving(false);
	};

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			if (name === 'title') {
				const regex = /[^a-zA-Z0-9_]/gi;
				const newSlug =
					value.title
						?.trim()
						.replaceAll(' ', '_')
						.replaceAll(regex, '')
						.toLocaleLowerCase() || '';
				setValue('slug', newSlug);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, setValue]);

	return (
		<AdminLayout
			title={'Producto'}
			subTitle={`Editando: ${product.title}`}
			icon={<DriveFileRenameOutline />}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
					<Button
						color='secondary'
						startIcon={<SaveOutlined />}
						sx={{ width: '150px' }}
						type='submit'
					>
						Guardar
					</Button>
				</Box>

				<Grid container spacing={2}>
					{/* Data */}
					<Grid xs={12} sm={6}>
						<TextField
							label='Título'
							variant='outlined'
							fullWidth
							sx={{ mb: 2 }}
							{...register('title', {
								required: 'Este campo es requerido',
								minLength: { value: 2, message: 'Mínimo 2 caracteres' },
							})}
							error={!!errors.title}
							helperText={errors.title?.message}
						/>

						<TextField
							label='Descripción'
							variant='outlined'
							fullWidth
							rows={5}
							multiline
							sx={{ mb: 2 }}
							{...register('description', {
								required: 'Este campo es requerido',
							})}
							error={!!errors.description}
							helperText={errors.description?.message}
						/>

						<TextField
							label='Inventario'
							type='number'
							variant='outlined'
							fullWidth
							sx={{ mb: 2 }}
							{...register('inStock', {
								required: 'Este campo es requerido',
								minLength: { value: 0, message: 'Mínimo de valor cero' },
							})}
							error={!!errors.inStock}
							helperText={errors.inStock?.message}
						/>

						<TextField
							label='Precio'
							type='number'
							variant='outlined'
							fullWidth
							sx={{ mb: 2 }}
							{...register('price', {
								required: 'Este campo es requerido',
								minLength: { value: 0, message: 'Mínimo de valor cero' },
							})}
							error={!!errors.price}
							helperText={errors.price?.message}
						/>

						<Divider sx={{ my: 1 }} />

						<Controller
							name='type'
							control={control}
							defaultValue={undefined}
							render={({ field }) => (
								<FormControl>
									<FormLabel>Tipo</FormLabel>
									<RadioGroup row {...field}>
										{validTypes.map((option) => (
											<FormControlLabel
												key={option}
												value={option}
												control={<Radio color='secondary' />}
												label={capitalize(option)}
											/>
										))}
									</RadioGroup>
								</FormControl>
							)}
						/>

						<Controller
							name='gender'
							control={control}
							defaultValue={undefined}
							render={({ field }) => (
								<FormControl>
									<FormLabel>Tipo</FormLabel>
									<RadioGroup row {...field}>
										{validGender.map((option) => (
											<FormControlLabel
												key={option}
												value={option}
												control={<Radio color='secondary' />}
												label={capitalize(option)}
											/>
										))}
									</RadioGroup>
								</FormControl>
							)}
						/>

						<Controller
							name='sizes'
							control={control}
							render={({ field }) => (
								<FormControl fullWidth margin='dense' error={!!errors.sizes}>
									<FormLabel>Sizes</FormLabel>
									<FormGroup>
										{validSizes.map((size) => (
											<FormControlLabel
												key={size}
												label={size}
												control={
													<Checkbox
														value={size}
														checked={field.value.some((val) => val === size)}
														onChange={({ target: { value } }, checked) => {
															checked
																? field.onChange([...field.value, value])
																: field.onChange(
																		field.value.filter((val) => val !== value)
																  );
														}}
													/>
												}
											/>
										))}
									</FormGroup>
									<FormHelperText>
										{capitalize(`${(errors.sizes as any)?.message || ''}`)}
									</FormHelperText>
								</FormControl>
							)}
						/>
					</Grid>

					{/* Tags e imagenes */}
					<Grid xs={12} sm={6}>
						<TextField
							label='Slug - URL'
							variant='outlined'
							fullWidth
							sx={{ mb: 2 }}
							{...register('slug', {
								required: 'Este campo es requerido',
								validate: (val) =>
									val.trim().includes(' ')
										? 'No puede tener espacios en blanco'
										: undefined,
							})}
							error={!!errors.slug}
							helperText={errors.slug?.message}
						/>

						<TextField
							label='Etiquetas'
							variant='outlined'
							fullWidth
							value={newTagValue}
							onChange={({ target }) => setNewTagValue(target.value)}
							onKeyDown={({ code }) =>
								code === 'Space' ? onNewTag() : undefined
							}
							sx={{ mb: 2 }}
							helperText='Presiona [spacebar] para agregar'
						/>

						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								listStyle: 'none',
								p: 0,
								m: 0,
							}}
							component='ul'
						>
							{getValues('tags').map((tag) => {
								return (
									<Chip
										key={tag}
										label={tag}
										onDelete={() => onDeleteTag(tag)}
										color='primary'
										size='small'
										sx={{ ml: 1, mt: 1 }}
									/>
								);
							})}
						</Box>

						<Divider sx={{ my: 2 }} />

						<Box display='flex' flexDirection='column'>
							<FormLabel sx={{ mb: 2 }}>Imágenes</FormLabel>
							<Button
								color='secondary'
								fullWidth
								startIcon={<UploadOutlined />}
								sx={{ mb: 3 }}
								onClick={() => fileInputRef.current?.click()}
							>
								Cargar imagen
							</Button>
							<input
								ref={fileInputRef}
								type='file'
								multiple
								accept='image/png, image/jpeg, image/gif'
								style={{ display: 'none' }}
								onChange={onFileSelected}
							/>

							{getValues('images').length < 2 && (
								<Chip
									label='Es necesario al menos 2 imagenes'
									color='error'
									variant='outlined'
								/>
							)}

							<Grid container spacing={2}>
								{getValues('images').map((img) => (
									<Grid xs={4} sm={3} key={img}>
										<Card>
											<CardMedia
												component='img'
												className='fadeIn'
												image={img}
												alt={img}
											/>
											<CardActions>
												<Button
													fullWidth
													color='error'
													disabled={isSaving}
													onClick={() => onDeleteImage(img)}
												>
													Borrar
												</Button>
											</CardActions>
										</Card>
									</Grid>
								))}
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</form>
		</AdminLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { slug = '' } = query;

	let product: IProduct | null;

	if (slug === 'new') {
		// crear
		const tempProduct = JSON.parse(JSON.stringify(new Product()));
		delete tempProduct._id;
		//		tempProduct.images = ['img1.jpg', 'img2.jpg'];
		product = tempProduct;
	} else {
		product = await dbProducts.getProductBySlug(slug.toString());
	}

	if (!product) {
		return {
			redirect: {
				destination: '/admin/products',
				permanent: false,
			},
		};
	}

	return {
		props: {
			product,
		},
	};
};

export default ProductAdminPage;
