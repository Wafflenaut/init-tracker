const libraryReducerDefaultState = []

export default (state = libraryReducerDefaultState, action) => {
	switch(action.type){
		case 'ADD_COMBATANT_LIBRARY':
			return [
				...state,
				action.combatant
			];
		case 'REMOVE_COMBATANT':
			return state.filter(({ id }) => id !== action.id );
		case 'EDIT_COMBATANT_LIBRARY':
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
		case 'SET_LIBRARY':
			return action.library;
		default:
			return state;
	}
};