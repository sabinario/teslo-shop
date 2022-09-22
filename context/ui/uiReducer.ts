import { UIState } from './';

type UIActionType = { type: 'toggleMenu' };
export const uiReducer = (state: UIState, action: UIActionType): UIState => {
	switch (action.type) {
		case 'toggleMenu':
			return { ...state, sideMenuOpen: !state.sideMenuOpen };
		default:
			return state;
	}
};
