import { UIState } from './';

type UIActionType = { type: 'openMenu' } | { type: 'closeMenu' };
export const uiReducer = (state: UIState, action: UIActionType): UIState => {
	switch (action.type) {
		case 'closeMenu':
			return { ...state, sideMenuOpen: false };
		case 'openMenu':
			return { ...state, sideMenuOpen: true };
		default:
			return state;
	}
};
