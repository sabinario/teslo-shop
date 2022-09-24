import { ICartProduct } from '../../interfaces';
import { Address, CartState } from './';

type CartActionType =
	| { type: 'UpdateCart'; payload: ICartProduct[] }
	| { type: 'LoadCartFromStorage'; payload: ICartProduct[] }
	| { type: 'UpdateCartQuantity'; payload: ICartProduct }
	| { type: 'LoadAddress'; payload: Address }
	| { type: 'UpdateAddress'; payload: Address }
	| { type: 'RemoveCartItem'; payload: ICartProduct }
	| {
			type: 'UpdateOrderSummary';
			payload: {
				numberOfItems: number;
				subtotal: number;
				tax: number;
				total: number;
			};
	  };

export const cartReducer = (
	state: CartState,
	action: CartActionType
): CartState => {
	switch (action.type) {
		case 'UpdateCart':
			return { ...state, cart: [...action.payload] };
		case 'LoadCartFromStorage':
			return { ...state, isLoaded: true, cart: action.payload };
		case 'UpdateCartQuantity':
			return {
				...state,
				cart: state.cart.map((product) => {
					if (product._id !== action.payload._id) return product;
					if (product.size !== action.payload.size) return product;

					return action.payload;
				}),
			};
		case 'RemoveCartItem':
			return {
				...state,
				cart: state.cart.filter((product) => {
					if (product._id !== action.payload._id) return product;

					if (product.size !== action.payload.size) return product;
				}),
			};
		case 'UpdateOrderSummary':
			return { ...state, ...action.payload };
		case 'UpdateAddress':
		case 'LoadAddress':
			return { ...state, address: action.payload };
		default:
			return state;
	}
};
