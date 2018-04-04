const encounterReducerDefaultState = {
	playersWinTies: false,
	currentCombatantId: '',
	currentCombatantOrder: 0,
	orderedCombatants: []
};

export default (state = encounterReducerDefaultState, action) => {
	switch(action.type){
		case 'SET_PLAYERS_WIN_TIES':
		console.log(state);
			console.log('set_playerswinties state')
			console.log(state);
			return {
				...state,
				playersWinTies: action.playersWinTies
			}
		case 'SET_CURRENT_COMBATANT':
			console.log('set_currentcombatant state')
			console.log(state);
			return {
				...state,
				currentCombatantId: action.currentCombatantId,
				currentCombatantOrder: action.currentCombatantOrder
			}
		case 'ALTER_ACTIVE_COMBATANT_ORDER':
			return {
				...state,
				orderedCombatants: action.orderedCombatants
			}
		case 'SET_ENCOUNTER':
			console.log('set_encounter state')
			console.log(state);
			console.log('set_encounter encounter');
			console.log(action.encounter);
			if(action.encounter != null) {
				return action.encounter
			}
			else{
				return state;
			}
		default:
			return state;
	}
};