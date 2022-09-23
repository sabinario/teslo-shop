import { ChangeEvent, useContext, useState } from 'react';

import { useRouter } from 'next/router';

import {
	Box,
	Divider,
	Drawer,
	IconButton,
	Input,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from '@mui/material';

import { UIContext } from '../../context';
import {
	AccountCircleOutlined,
	AdminPanelSettings,
	CategoryOutlined,
	ConfirmationNumberOutlined,
	EscalatorWarningOutlined,
	FemaleOutlined,
	LoginOutlined,
	MaleOutlined,
	SearchOutlined,
	VpnKeyOutlined,
} from '../../shared/material-icons';

export const SideMenu = () => {
	const { sideMenuOpen, toggleMenu } = useContext(UIContext);
	const [searchQuery, setSearchQuery] = useState('');

	const router = useRouter();

	const navigateTo = (url: string) => {
		router.push(url);
		setSearchQuery('');
	};

	const onSearchQuery = () => {
		if (searchQuery.trim().length === 0) return;

		toggleMenu();
		navigateTo(`/search/${searchQuery}`);
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchQuery(value);
	};

	return (
		<Drawer
			open={sideMenuOpen}
			onClose={() => toggleMenu()}
			anchor='right'
			sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
		>
			<Box sx={{ width: 250, paddingTop: 5 }}>
				<List>
					<ListItem>
						<Input
							autoFocus
							value={searchQuery}
							type='text'
							placeholder='Buscar...'
							onChange={onChange}
							onKeyDown={(e) => e.key === 'Enter' && onSearchQuery()}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton onClick={onSearchQuery}>
										<SearchOutlined />
									</IconButton>
								</InputAdornment>
							}
						/>
					</ListItem>

					<ListItemButton>
						<ListItemIcon>
							<AccountCircleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Perfil'} />
					</ListItemButton>

					<ListItemButton>
						<ListItemIcon>
							<ConfirmationNumberOutlined />
						</ListItemIcon>
						<ListItemText primary={'Mis Ordenes'} />
					</ListItemButton>

					<ListItemButton
						sx={{ display: { xs: '', sm: 'none' } }}
						onClick={() => navigateTo('/category/men')}
					>
						<ListItemIcon>
							<MaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Hombres'} />
					</ListItemButton>

					<ListItemButton
						sx={{ display: { xs: '', sm: 'none' } }}
						onClick={() => navigateTo('/category/women')}
					>
						<ListItemIcon>
							<FemaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Mujeres'} />
					</ListItemButton>

					<ListItemButton
						sx={{ display: { xs: '', sm: 'none' } }}
						onClick={() => navigateTo('/category/kid')}
					>
						<ListItemIcon>
							<EscalatorWarningOutlined />
						</ListItemIcon>
						<ListItemText primary={'Niños'} />
					</ListItemButton>

					<ListItemButton>
						<ListItemIcon>
							<VpnKeyOutlined />
						</ListItemIcon>
						<ListItemText primary={'Ingresar'} />
					</ListItemButton>

					<ListItemButton>
						<ListItemIcon>
							<LoginOutlined />
						</ListItemIcon>
						<ListItemText primary={'Salir'} />
					</ListItemButton>

					{/* Admin */}
					<Divider />
					<ListSubheader>Admin Panel</ListSubheader>

					<ListItemButton>
						<ListItemIcon>
							<CategoryOutlined />
						</ListItemIcon>
						<ListItemText primary={'Productos'} />
					</ListItemButton>
					<ListItemButton>
						<ListItemIcon>
							<ConfirmationNumberOutlined />
						</ListItemIcon>
						<ListItemText primary={'Ordenes'} />
					</ListItemButton>

					<ListItemButton>
						<ListItemIcon>
							<AdminPanelSettings />
						</ListItemIcon>
						<ListItemText primary={'Usuarios'} />
					</ListItemButton>
				</List>
			</Box>
		</Drawer>
	);
};
