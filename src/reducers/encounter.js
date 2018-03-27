const encounterReducerDefaultState = {
	playersWinTies: false,
	currentCombatantId: '',
	currentCombatantOrder: 0
};

export default (state = encounterReducerDefaultState, action) => {
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
		case 'SET_ENCOUNTER':
			const encounter = action.encounter
			return {
				encounter
			}
		default:
			return state;
	}
};