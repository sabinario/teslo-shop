import { createContext } from 'react';

import { ICartProduct, ShippingAddress } from '../../interfaces';

interface ContextProps {
	cart: ICartProduct[];
	numberOfItems: number;
	subtotal: number;
	tax: number;
	isLoaded: boolean;
	total: number;
	address?: ShippingAddress;

	addProduct: (product: ICartProduct) => void;
	updateCartProduct: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
	updateAddress: (address: ShippingAddress) => void;
	createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const CartContext = createContext({} as ContextProps);
