import uuid from 'uuid';
import database from '../firebase/firebase';
import { initialCurrentCombatant } from '../selectors/combatants';

export const setPlayersWinTies = ( playersWinTies = false) => ({
	type: 'SET_PLAYERS_WIN_TIES',
	playersWinTies
});

export const startSetPlayersWinTies = ( playersWinTies = false ) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/encounter`).update({
			playersWinTies
		}).then(() => {
			dispatch(setPlayersWinTies(playersWinTies));
		});
	}
}

export const startSetInitialCurrentCombatant = () => {
	return (dispatch, getState) => {
		const combatants = getState().combatants;
		const encounter = getState().encounter;
		console.log('encounter in startSetInitialCurrentCombatant');
		console.log(encounter);
		const uid = getState().auth.uid;
		let surpriseCombatants = combatants.filter(combatant => combatant.surprise === true);
		let initialCombatant = {}
		
		if(surpriseCombatants.length === 0){	
			initialCombatant = combatants.filter(combatant => combatant.order == 1)[0];	
		}
		else{
			surpriseCombatants.sort((a,b) => {return a.order-b.order});
			initialCombatant = surpriseCombatants[0];
		}
		const currentCombatantId = initialCombatant.id;
		const currentCombatantOrder = initialCombatant.order;
		
		return database.ref(`users/${uid}/encounter`).update({
			...encounter,
			currentCombatantId,
			currentCombatantOrder
		}).then(() => {
			dispatch(setCurrentCombatant(initialCombatant.id, initialCombatant.order));
		});
		
	};
};

export const setCurrentCombatant = ( currentCombatantId = '', currentCombatantOrder = 0) => ({
	type: 'SET_CURRENT_COMBATANT',
	currentCombatantId,
	currentCombatantOrder
});

export const startSetCurrentCombatant = (currentCombatantId = '', currentCombatantOrder = 0) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/encounter`).update({
			currentCombatantId,
			currentCombatantOrder
		}).then(() => {
			dispatch(setCurrentCombatant(currentCombatantId, currentCombatantOrder));
		});
	};
};

export const setLibraryNpcTypeFilter = ( NpcType = 'None') => ({
	type: 'SET_NPCTYPE_FILTER',
	text
});

export const setNameFilter = ( name = '') => ({
	type: 'SET_TEXT_FILTER',
	name
});

export const setFilterBySurprised = (filterBySurprise = true) => ({
	type: 'FILTER_BY_SURPRISED',
	filterBySurprise
});

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
				console.log('encounter snapshot');
				console.log(snapshot.val());
				console.log('encounter snapshot end');
				const encounter = snapshot.val();
				
			dispatch(setEncounter(encounter));
				
		});
		
	};
};
