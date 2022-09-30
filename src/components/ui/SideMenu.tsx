import { ChangeEvent, useContext, useState } from 'react';

import { AuthContext, UIContext } from 'context';
import { useRouter } from 'next/router';
import {
	AccountCircleOutlined,
	AdminPanelSettings,
	Box,
	CategoryOutlined,
	ConfirmationNumberOutlined,
	Divider,
	Drawer,
	EscalatorWarningOutlined,
	FemaleOutlined,
	IconButton,
	Input,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	LoginOutlined,
	MaleOutlined,
	SearchOutlined,
	VpnKeyOutlined,
} from 'shared/';

import { DashboardOutlined } from '@mui/icons-material';

export const SideMenu = () => {
	const { user, isLoggedIn, logout } = useContext(AuthContext);
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

	const onLogoutClick = () => {
		toggleMenu();
		logout();
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

					{isLoggedIn && (
						<>
							<ListItemButton>
								<ListItemIcon>
									<AccountCircleOutlined />
								</ListItemIcon>
								<ListItemText primary={'Perfil'} />
							</ListItemButton>

							<ListItemButton
								onClick={() => {
									toggleMenu();
									navigateTo('/orders/history');
								}}
							>
								<ListItemIcon>
									<ConfirmationNumberOutlined />
								</ListItemIcon>
								<ListItemText primary={'Mis Ordenes'} />
							</ListItemButton>
						</>
					)}

					<ListItemButton
						sx={{ display: { xs: '', md: 'none' } }}
						onClick={() => navigateTo('/category/men')}
					>
						<ListItemIcon>
							<MaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Hombres'} />
					</ListItemButton>

					<ListItemButton
						sx={{ display: { xs: '', md: 'none' } }}
						onClick={() => navigateTo('/category/women')}
					>
						<ListItemIcon>
							<FemaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Mujeres'} />
					</ListItemButton>

					<ListItemButton
						sx={{ display: { xs: '', md: 'none' } }}
						onClick={() => navigateTo('/category/kid')}
					>
						<ListItemIcon>
							<EscalatorWarningOutlined />
						</ListItemIcon>
						<ListItemText primary={'Niños'} />
					</ListItemButton>

					{isLoggedIn ? (
						<ListItemButton onClick={() => onLogoutClick()}>
							<ListItemIcon>
								<LoginOutlined />
							</ListItemIcon>
							<ListItemText primary={'Salir'} />
						</ListItemButton>
					) : (
						<ListItemButton
							onClick={() => {
								toggleMenu();
								navigateTo(`/auth/login?p=${router.asPath}`);
							}}
						>
							<ListItemIcon>
								<VpnKeyOutlined />
							</ListItemIcon>
							<ListItemText primary={'Ingresar'} />
						</ListItemButton>
					)}

					{/* Admin */}

					{user?.role === 'admin' && (
						<>
							<Divider />
							<ListSubheader>Admin Panel</ListSubheader>

							<ListItemButton
								onClick={() => {
									toggleMenu();
									navigateTo(`/admin`);
								}}
							>
								<ListItemIcon>
									<DashboardOutlined />
								</ListItemIcon>
								<ListItemText primary={'Dashboard'} />
							</ListItemButton>
							<ListItemButton
								onClick={() => {
									toggleMenu();
									navigateTo(`/admin/products`);
								}}
							>
								<ListItemIcon>
									<CategoryOutlined />
								</ListItemIcon>
								<ListItemText primary={'Productos'} />
							</ListItemButton>

							<ListItemButton
								onClick={() => {
									toggleMenu();
									navigateTo(`/admin/orders`);
								}}
							>
								<ListItemIcon>
									<ConfirmationNumberOutlined />
								</ListItemIcon>
								<ListItemText primary={'Ordenes'} />
							</ListItemButton>

							<ListItemButton
								onClick={() => {
									toggleMenu();
									navigateTo(`/admin/users`);
								}}
							>
								<ListItemIcon>
									<AdminPanelSettings />
								</ListItemIcon>
								<ListItemText primary={'Usuarios'} />
							</ListItemButton>
						</>
					)}
				</List>
			</Box>
		</Drawer>
	);
};
