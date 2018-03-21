import uuid from 'uuid';
import database from '../firebase/firebase';

//LIKELY JUNK THIS - SET TIES TO A FILTER

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
			active = true,
			type = 'NPC',
			initiativeBonus = 0,
			initiativeRoll = 0,
			addToLibrary = false
			
		} = combatantData;
		const combatant = { name, surprised, type, initiativeBonus, initiativeRoll, addToLibrary };
		
		return database.ref(`users/${uid}/combatants`).push(combatant).then((ref) => {
			dispatch(addCombatant({
				id: ref.key,
				...combatant
			}));
		});
	};
};

export const resetEncounter = () => ({
	type: 'REMOVE_COMBATANT'
});

export const startResetEncounter = () => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		//change this to set to default
		return database.ref(`users/${uid}/encounter`).remove().then(() => {
			//remove all combatants as well
			dispatch(removeCombatant({id}));
		});
	};
};

export const updateEncounter = (updates) => ({
	type: 'UPDATE_ENCOUNTER',
	updates
});

export const startUpdateEncounter = (updates) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/encounter`).update({
			...updates
		}).then(() => {
			dispatch(updateEncounter(updates));
		});
	};
};

export const setEncounter = (encounter) => ({
	type: 'SET_ENCOUNTER',
	encounter
});



export const startSetEncounter = () => {
	
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/encounter`)
			.once('value')
			.then((snapshot) => {
				const encounter = {
					...childSnapshot.val()
				};
			
				
			dispatch(setEncounter(encounter));
				
		});
		
	};
};