import { createContext } from 'react';

import { ICartProduct } from '../../interfaces';
import { Address } from './CartProvider';

interface ContextProps {
	cart: ICartProduct[];
	numberOfItems: number;
	subtotal: number;
	tax: number;
	isLoaded: boolean;
	total: number;
	address?: Address;

	addProduct: (product: ICartProduct) => void;
	updateCartProduct: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
	updateAddress: (address: Address) => void;
}

export const CartContext = createContext({} as ContextProps);
