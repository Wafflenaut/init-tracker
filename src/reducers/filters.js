const filtersReducerDefaultState = {
	playersWinTies: false,
	currentCombatant: '',
	currentCombatant: Infinity
};

export default (state = filtersReducerDefaultState, action) => {
	switch(action.type){
		case 'SET_PLAYERS_WIN_TIES':
			return {
				...state,
				playersWinTies: action.playersWinTies
			}
		case 'SET_CURRENT_COMBATANT':
			return {
				...state,
				currentCombatant: action.currentCombatant
			}
		default:
			return state;
	}
};