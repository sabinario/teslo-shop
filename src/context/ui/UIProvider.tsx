import { ReactNode, useReducer } from 'react';

import { UIContext, uiReducer } from '.';

interface ProviderProps {
	children: ReactNode;
}

export interface UIState {
	sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
	sideMenuOpen: false,
};

export const UIProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const toggleMenu = () => {
		if (state.sideMenuOpen) {
			dispatch({ type: 'closeMenu' });
			return;
		}
		dispatch({ type: 'openMenu' });
	};

	const value = {
		...state,
		toggleMenu,
	};

	return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
