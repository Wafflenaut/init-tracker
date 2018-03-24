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
			surprise = false,
			active = true,
			type = 'NPC/Monster',
			initiativeBonus = 0,
			initiativeRoll = 0,
			addToLibrary = false
			
		} = combatantData;
		const combatant = { name, active, surprise, type, initiativeBonus, initiativeRoll, addToLibrary };
		
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

export const setCombatantActiveStatus = (id, active) => ({
	type: 'SET_COMBATANT_ACTIVE_STATUS',
	id,
	active
})

export const startSetCombatantActiveStatus = (id, active) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/combatants/${id}`).update({
			active
		}).then(() => {
			dispatch(setCombatantActiveStatus(id, active));
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