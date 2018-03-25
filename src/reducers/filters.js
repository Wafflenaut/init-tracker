const filtersReducerDefaultState = {
	playersWinTies: false,
	currentCombatantID: '',
	currentCombatantOrder: Infinity
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
				currentCombatantId: action.currentCombatant.id,
				currentCombatantOrder: action.currentCombatant.order
			}
		default:
			return state;
	}
};