const combatantReducerDefaultState = []

export default (state = combatantReducerDefaultState, action) => {
	switch(action.type){
		case 'ADD_COMBATANT':
			return [
				...state,
				action.combatant
			];
		case 'REMOVE_COMBATANT':
			return state.filter(({ id }) => id !== action.id );
		case 'EDIT_COMBATANT':
			return state.map((combatant) => {
				if(combatant.id === action.id) {
					return {
						...combatant,
						...action.updates
					}
				}
				else {
					return combatant;
				}
			});
		case 'SET_COMBATANTS':
			return action.combatants;
		default:
			return state;
	}
};