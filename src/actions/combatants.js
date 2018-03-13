import uuid from 'uuid';
import database from '../firebase/firebase';

export const addCombatant = (combatant) => ({
	type: 'ADD_COMBATANT',
	combatant
});

export const startAddCombatant = (combatantData = {}) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		const {
			name = '',
			surprised = false,
			type = 'NPC',
			initiativeBonus = 0,
			initiativeRoll = 0
			
		} = combatantData;
		const combatant = { name, surprised, type, initiativeBonus, initiativeRoll };
		
		return database.ref(`users/${uid}/combatants`).push(combatant).then((ref) => {
			dispatch(addCombatant({
				id: ref.key,
				...combatant
			}));
		});
	};
};

export const removeCombatant = ({id} = {}) => ({
	type: 'REMOVE_COMBATANT',
	id
});

export const startRemoveCombatant = ({id} = {}) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/combatants/${id}`).remove().then(() => {
			dispatch(removeCombatant({id}));
		});
	};
};

export const editCombatant = (id, updates) => ({
	type: 'EDIT_COMBATANT',
	id,
	updates
});

export const startEditCombatant = (id, updates) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/combatants/${id}`).update({
			...updates
		}).then(() => {
			dispatch(editCombatant(id, updates));
		});
	};
};

export const setCombatants = (combatants) => ({
	type: 'SET_COMBATANTS',
	combatants
});



export const startSetCombatants = () => {
	
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/combatants`)
			.once('value')
			.then((snapshot) => {
				const combatants = [];
				
				snapshot.forEach((childSnapshot) => {
					combatants.push({
						id: childSnapshot.key,
						...childSnapshot.val()
					});
				});
				
				
			dispatch(setCombatants(combatants));
				
		});
		
	};
};