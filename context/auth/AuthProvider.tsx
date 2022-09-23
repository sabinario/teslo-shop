import React, { useEffect, useReducer } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';

import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

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
	const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

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
		try {
			const { data } = await tesloApi.get('/user/validate-token');
			const { token, user } = data;

			Cookies.set('token', token);

			dispatch({ type: 'Login', payload: user });
		} catch (err) {
			Cookies.remove('token');
		}
	};

	useEffect(() => {
		checkToken();
	}, []);

	const value = { ...state, loginUser, registerUser };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
