import uuid from 'uuid';
import database from '../firebase/firebase';
import { initialCurrentCombatant } from '../selectors/combatants';
import { surpriseCombatants } from '../selectors/surpriseCombatants';
import { activeCombatants, orderedActiveCombatants } from '../selectors/activeCombatants';
import { encounterNextCombatant } from '../selectors/encounter';


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

export const alterActiveCombatantOrder = (orderedCombatants = []) => ({
	type: 'ALTER_ACTIVE_COMBATANT_ORDER',
	orderedCombatants
})

export const startAlterActiveCombatantOrder = () => {
	return (dispatch, getState) => {
		const combatants = getState().combatants;
		const encounter = getState().encounter;
		console.log('There is an encounter');
		console.log(encounter)
		
		const orderedCombatants = orderedActiveCombatants(combatants, encounter);
		console.log('Ordered combatants in encounter action');
		console.log(orderedCombatants);
		dispatch(alterActiveCombatantOrder(orderedCombatants));
	};
};
/*
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
}*/

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



export const startSetNextCombatant = (prevCombatantOrder = 0) => {
	return (dispatch, getState) => {
		
		const combatants = getState().combatants;
		const encounter = getState().encounter;
		/*
		let nextCombatantId = '';
		let nextCombatantOrder = 0;
		const surpriseCombatantsList = surpriseCombatants(combatants, encounter);
		
		
		
		if(surpriseCombatantsList.length > 0){
			console.log('Surprise list length' + surpriseCombatants.length);
			nextCombatantId = surpriseCombatantsList[0].id;
			nextCombatantOrder = surpriseCombatantsList[0].order;
		}
		else{
			const activeCombatantsList = activeCombatants(combatants, encounter);
			console.log('Is this sorted');
			console.log(activeCombatantsList);
			if(activeCombatantsList.length > 0){
				const eligibleActiveCombatantsList = activeCombatantsList.filter(combatant => combatant.order > prevCombatantOrder);
				if(eligibleActiveCombatantsList.length > 0){
					//console.log('eligible active combatants: ' + prevCombatantOrder)
					nextCombatantId = eligibleActiveCombatantsList[0].id;
					nextCombatantOrder = eligibleActiveCombatantsList[0].order;
				}
				else{
					nextCombatantId = activeCombatantsList[0].id;
					nextCombatantOrder = activeCombatantsList[0].order;
				}
			}
			else{
				//no remaining active combatants
				nextCombatantId = '';
				nextCombatantOrder = 0;
			}
		}
		
		//console.log('nextCombatantId: ' + nextCombatantId);
		console.log('nextCombatantOrder: ' + nextCombatantOrder);
		
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/encounter`).update({
			currentCombatantId: nextCombatantId,
			currentCombatantOrder: nextCombatantOrder
		}).then(() => {
			console.log('setting current combatant in startSetNextCombatant: ' + nextCombatantOrder);
			dispatch(setCurrentCombatant(nextCombatantId, nextCombatantOrder));
		});
		*/
		const nextCombatant = encounterNextCombatant(combatants, encounter, prevCombatantOrder);
		
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/encounter`).update({
			currentCombatantId: nextCombatant.id,
			currentCombatantOrder: nextCombatant.order
		}).then(() => {
			console.log('setting current combatant in startSetNextCombatant: ' + nextCombatant.order);
			dispatch(setCurrentCombatant(nextCombatant.id, nextCombatant.order));
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
				//console.log('encounter snapshot');
				//console.log(snapshot.val());
				//console.log('encounter snapshot end');
				const encounter = snapshot.val();
				
			dispatch(setEncounter(encounter));
				
		});
		
	};
};
