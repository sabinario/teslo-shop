import { createContext } from 'react';

interface ContextProps {
	sideMenuOpen: boolean;
	toggleMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
