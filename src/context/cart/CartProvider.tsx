import React, { useEffect, useReducer } from 'react';

import axios from 'axios';
import Cookie from 'js-cookie';
import Cookies from 'js-cookie';

import { tesloApi } from '../../api';
import { ICartProduct, IOrder, ShippingAddress } from '../../interfaces';
import { CartContext, cartReducer } from '.';

interface Props {
	children: React.ReactNode;
}

export interface CartState {
	isLoaded: boolean;
	cart: ICartProduct[];
	numberOfItems: number;
	subtotal: number;
	tax: number;
	total: number;
	address?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
	cart: [],
	numberOfItems: 0,
	subtotal: 0,
	tax: 0,
	total: 0,
	isLoaded: false,
	address: undefined,
};

export const getAddressFromCookies = (): ShippingAddress => {
	return {
		firstName: Cookies.get('firstName') || '',
		lastname: Cookies.get('lastname') || '',
		address: Cookies.get('address') || '',
		address2: Cookies.get('address2') || '',
		zipCode: Cookies.get('zipCode') || '',
		city: Cookies.get('city') || '',
		country: Cookies.get('country') || '',
		phone: Cookies.get('phone') || '',
	};
};

export const CartProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	useEffect(() => {
		if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart));
	}, [state.cart]);

	useEffect(() => {
		const numberOfItems = state.cart.reduce((prev, current) => {
			return current.quantity + prev;
		}, 0);

		const subtotal = state.cart.reduce((prev, current) => {
			return current.price * current.quantity + prev;
		}, 0);

		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

		const orderSummary = {
			numberOfItems,
			subtotal: subtotal,
			tax: subtotal * taxRate,
			total: subtotal * (taxRate + 1),
		};
		dispatch({ type: 'UpdateOrderSummary', payload: orderSummary });
	}, [state.cart]);

	useEffect(() => {
		try {
			const productsInCookies = Cookie.get('cart')
				? JSON.parse(Cookie.get('cart')!)
				: [];

			dispatch({ type: 'LoadCartFromStorage', payload: productsInCookies });
		} catch (err) {
			dispatch({ type: 'LoadCartFromStorage', payload: [] });
		}
	}, []);

	useEffect(() => {
		if (Cookies.get('firstName')) {
			dispatch({ type: 'LoadAddress', payload: getAddressFromCookies() });
		}
	}, []);

	const addProduct = (product: ICartProduct) => {
		const productInCart = state.cart.some((p) => p._id === product._id);

		/* Si el producto no existe en el carrito lo agregamos */
		if (!productInCart) {
			return dispatch({
				type: 'UpdateCart',
				payload: [...state.cart, product],
			});
		}

		const diffProductInCart = state.cart.some(
			(p) => p._id === product._id && p.size === product.size
		);

		/* Si el producto existe en el carrito, pero es diferente en algún aspecto
			 lo agregamos al carrito */
		if (!diffProductInCart) {
			return dispatch({
				type: 'UpdateCart',
				payload: [...state.cart, product],
			});
		}

		/* Si el producto existe en el carrito y el cliente está agregando el mismo
			 producto de nuevo, actualizamos el producto en el carrito */
		const updatedProducts = state.cart.map((p) => {
			if (p._id !== product._id) return p;
			if (p.size !== product.size) return p;

			p.quantity += product.quantity;

			return p;
		});

		dispatch({ type: 'UpdateCart', payload: updatedProducts });
	};

	const updateCartProduct = (product: ICartProduct) => {
		dispatch({ type: 'UpdateCartQuantity', payload: product });
	};

	const removeCartProduct = (product: ICartProduct) => {
		dispatch({ type: 'RemoveCartItem', payload: product });
	};

	const updateAddress = (address: ShippingAddress) => {
		Cookies.set('firstName', address.firstName);
		Cookies.set('lastname', address.lastname);
		Cookies.set('address', address.address);
		Cookies.set('address2', address.address2 || '');
		Cookies.set('zipCode', address.zipCode);
		Cookies.set('city', address.city);
		Cookies.set('country', address.country);
		Cookies.set('phone', address.phone);
		dispatch({ type: 'UpdateAddress', payload: address });
	};

	const createOrder = async (): Promise<{
		hasError: boolean;
		message: string;
	}> => {
		if (!state.address) {
			throw new Error('No hay dirección de entrega');
		}

		const body: IOrder = {
			orderItems: state.cart.map((p) => ({
				...p,
				size: p.size!,
			})),
			shippingAddress: state.address,
			numberOfItems: state.numberOfItems,
			subtotal: state.subtotal,
			tax: state.tax,
			total: state.total,
			isPaid: false,
		};

		try {
			const { data } = await tesloApi.post('/orders', body);

			dispatch({ type: 'OrderComplete' });

			return {
				hasError: false,
				message: data._id,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const { message } = error.response?.data as { message: string };
				return {
					hasError: true,
					message: message,
				};
			}
			return {
				hasError: true,
				message: 'Error no encontrado, hable con el administrador',
			};
		}
	};

	const value = {
		...state,
		addProduct,
		updateCartProduct,
		removeCartProduct,
		updateAddress,
		createOrder,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
