import { useContext } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	Link,
	Toolbar,
	Typography,
} from '@mui/material';

import { UIContext } from '../../context';

export const Navbar = () => {
	const { toggleMenu } = useContext(UIContext);
	const router = useRouter();
	const { gender } = router.query;

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
				<Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
				<IconButton>
					<SearchOutlined />
				</IconButton>

				<NextLink href='/cart' passHref>
					<IconButton>
						<Badge badgeContent={2} color='primary'>
							<ShoppingCartOutlined />
						</Badge>
					</IconButton>
				</NextLink>
				<Button onClick={() => toggleMenu()}>Menú</Button>
			</Toolbar>
		</AppBar>
	);
};
