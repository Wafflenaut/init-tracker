import uuid from 'uuid';
import database from '../firebase/firebase';

export const addCombatantLibrary = (combatant) => ({
	type: 'ADD_COMBATANT_LIBRARY',
	combatant
});

export const editCombatantLibrary = (id, updates) => ({
	type: 'EDIT_COMBATANT_LIBRARY',
	id,
	updates
});

export const startUpdateLibrary = (combatantData = {}) => {
	return (dispatch, getState) => {
		const {
			name = '',
			type = 'NPC/Monster',
			initiativeBonus = 0
		} = combatantData;
		const combatant = { name, type, initiativeBonus };
		
		const uid = getState().auth.uid;
		const library = getState().library;
		const combatantMatch = library.filter(entry => combatant.name == entry.name);
		
		if(combatantMatch.length === 0) {
			return database.ref(`users/${uid}/library`).push(combatant).then((ref) => {
				dispatch(addCombatantLibrary({
					id: ref.key,
					...combatant
				}));
		});
		}
		else {
			return database.ref(`users/${uid}/library/${combatantMatch[0].id}`).update({
				...updates
			}).then(() => {
				dispatch(editCombatantLibrary(combatantMatch[0].id, updates));
			});
		}

	};
};

export const setLibrary = (library) => ({
	type: 'SET_COMBATANTS',
	library
});


export const startSetLibrary = () => {
	
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/library`)
			.once('value')
			.then((snapshot) => {
				const library = [];
				
				snapshot.forEach((childSnapshot) => {
					library.push({
						id: childSnapshot.key,
						...childSnapshot.val()
					});
				});
				
				
			dispatch(setLibrary(library));
				
		});
		
	};
};