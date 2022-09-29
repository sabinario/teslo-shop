import React, { useEffect, useReducer } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from '.';

interface Props {
	children: React.ReactNode;
}

export interface AuthState {
	isLoggedIn: boolean;
	user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	user: undefined,
};

export const AuthProvider = ({ children }: Props) => {
	const { data, status } = useSession();

	const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
	const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated') {
			dispatch({ type: 'Login', payload: data?.user as IUser });
		}
	}, [status, data]);

	const loginUser = async (
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			const { data } = await tesloApi.post('/user/login', { email, password });

			const { token, user } = data;

			Cookies.set('token', token);

			dispatch({ type: 'Login', payload: user });

			return true;
		} catch (error) {
			return false;
		}
	};

	const registerUser = async (
		name: string,
		email: string,
		password: string
	): Promise<{ hasError: boolean; message?: string }> => {
		try {
			const { data } = await tesloApi.post('/user/register', {
				name,
				email,
				password,
			});

			const { token, user } = data;

			Cookies.set('token', token);

			dispatch({ type: 'Login', payload: user });

			return {
				hasError: false,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const { message } = error.response?.data as { message: string };
				return {
					hasError: true,
					message,
				};
			}
			return {
				hasError: true,
				message: 'No se pudo crear el usuario',
			};
		}
	};

	const checkToken = async () => {
		if (!Cookies.get('token')) {
			return;
		}

		try {
			const { data } = await tesloApi.get('/user/validate-token');
			const { token, user } = data;

			Cookies.set('token', token);

			dispatch({ type: 'Login', payload: user });
		} catch (err) {
			Cookies.remove('token');
		}
	};

	const logout = () => {
		Cookies.remove('cart');
		Cookies.remove('firstName');
		Cookies.remove('lastname');
		Cookies.remove('address');
		Cookies.remove('address2');
		Cookies.remove('zipCode');
		Cookies.remove('city');
		Cookies.remove('country');
		Cookies.remove('phone');

		Cookies.remove('token');
		// router.reload();

		signOut();
		dispatch({ type: 'Logout' });
	};

	useEffect(() => {
		checkToken();
	}, []);

	const value = { ...state, loginUser, registerUser, logout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
