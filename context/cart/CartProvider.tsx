import React, { useEffect, useReducer } from 'react';

import Cookie from 'js-cookie';

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

interface Props {
	children: React.ReactNode;
}

export interface CartState {
	cart: ICartProduct[];
	numberOfItems: number;
	subtotal: number;
	tax: number;
	total: number;
}

const CART_INITIAL_STATE: CartState = {
	cart: [],
	numberOfItems: 0,
	subtotal: 0,
	tax: 0,
	total: 0,
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

	const value = {
		...state,
		addProduct,
		updateCartProduct,
		removeCartProduct,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
