import { useContext } from 'react';

import NextLink from 'next/link';

import { UIContext } from '../../context';
import {
	AppBar,
	Box,
	Button,
	Link,
	Toolbar,
	Typography,
} from '../../shared/material-components';

export const AdminNavbar = () => {
	const { toggleMenu } = useContext(UIContext);

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

				<Button onClick={(e) => e.detail !== 0 && toggleMenu()}>Menú</Button>
			</Toolbar>
		</AppBar>
	);
};
