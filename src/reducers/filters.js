const filtersReducerDefaultState = {
	playersWinTies: false,
	currentCombatantId: '',
	currentCombatantOrder: 0
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
				currentCombatantId: action.currentCombatantId,
				currentCombatantOrder: action.currentCombatantOrder
			}
		default:
			return state;
	}
};