import { ReactNode } from 'react';

import { Box, Typography } from '../../shared';
import { AdminNavbar } from '../admin';
import { SideMenu } from '../ui';

interface Props {
	title: string;
	subTitle: string;
	icon?: JSX.Element;
	children: ReactNode;
}

export const AdminLayout = ({ children, title, subTitle, icon }: Props) => {
	return (
		<>
			<nav>
				<AdminNavbar />
			</nav>

			<SideMenu />
			<main
				style={{ margin: '80px auto', maxWidth: '1440px', padding: '0 30px' }}
			>
				<Box display='flex' flexDirection='column'>
					<Box display='flex' alignItems='center' sx={{ mb: 2 }}>
						<Typography variant='h1' component='h1'>
							{title}
						</Typography>
						{icon}
					</Box>
					<Typography variant='h2' sx={{ mb: 2 }}>
						{subTitle}
					</Typography>
				</Box>
				<Box className='fadeIn'>{children}</Box>
			</main>
		</>
	);
};
