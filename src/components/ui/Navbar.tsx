import { ChangeEvent, useContext, useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { CartContext, UIContext } from 'context';
import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	Input,
	InputAdornment,
	Link,
	Toolbar,
	Typography,
	ClearOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
} from 'shared';

export const Navbar = () => {
	const { toggleMenu } = useContext(UIContext);
	const { numberOfItems } = useContext(CartContext);
	const router = useRouter();
	const { gender } = router.query;

	const [searchQuery, setSearchQuery] = useState('');
	const [isSearchVisible, setIsSearchVisible] = useState(false);

	const onSearchQuery = () => {
		if (searchQuery.trim().length === 0) return;

		router.push(`/search/${searchQuery}`);
		setIsSearchVisible(false);
		setSearchQuery('');
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchQuery(value);
	};

	return (
		<AppBar>
			<Toolbar>
				<NextLink href='/' passHref>
					<Link display='flex' alignItems='center' justifyContent='center'>
						<Typography variant='h6'>Teslo |</Typography>
						<Typography sx={{ marginLeft: 0.5 }}>Shop</Typography>
					</Link>
				</NextLink>

				<Box flex={1} />

				<Box
					sx={{
						display: isSearchVisible ? 'none' : { xs: 'none', md: 'block' },
					}}
					className='fadeIn'
				>
					<NextLink href='/category/men' passHref>
						<Link>
							<Button color={gender === 'men' ? 'primary' : 'info'}>
								Hombres
							</Button>
						</Link>
					</NextLink>
					<NextLink href='/category/women' passHref>
						<Link>
							<Button color={gender === 'women' ? 'primary' : 'info'}>
								Mujeres
							</Button>
						</Link>
					</NextLink>
					<NextLink href='/category/kid' passHref>
						<Link>
							<Button color={gender === 'kid' ? 'primary' : 'info'}>
								Niños
							</Button>
						</Link>
					</NextLink>
				</Box>

				<Box flex={1} />

				{/* Pantallas grandes */}
				{isSearchVisible ? (
					<Input
						autoFocus
						value={searchQuery}
						type='text'
						placeholder='Buscar...'
						onChange={onChange}
						onKeyDown={(e) => e.key === 'Enter' && onSearchQuery()}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton onClick={() => setIsSearchVisible(false)}>
									<ClearOutlined />
								</IconButton>
							</InputAdornment>
						}
						className='fadeIn'
						sx={{ display: { xs: 'none', sm: 'flex' } }}
					/>
				) : (
					<IconButton
						onClick={() => setIsSearchVisible(true)}
						className='fadeIn'
						sx={{ display: { xs: 'none', sm: 'flex' } }}
					>
						<SearchOutlined />
					</IconButton>
				)}

				{/* Pantallas pequeñas */}
				<IconButton
					sx={{ display: { xs: 'flex', sm: 'none' } }}
					onClick={(e) => e.detail !== 0 && toggleMenu()}
				>
					<SearchOutlined />
				</IconButton>

				<NextLink href='/cart' passHref>
					<IconButton>
						<Badge max={10} badgeContent={numberOfItems} color='primary'>
							<ShoppingCartOutlined />
						</Badge>
					</IconButton>
				</NextLink>
				<Button onClick={(e) => e.detail !== 0 && toggleMenu()}>Menú</Button>
			</Toolbar>
		</AppBar>
	);
};
