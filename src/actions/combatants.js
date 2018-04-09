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
			order = 0,
			addToLibrary = false
			
		} = combatantData;
		const combatant = { name, active, surprise, type, initiativeBonus, initiativeRoll, addToLibrary, order };
		
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
});

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



export const startInitiateEncounter = () => {
	console.log('startInitiateEncounter');
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		let combatants = []
		//let combatants = getState().combatants;

		getState().combatants.forEach((combatant) =>{
			const initiativeRoll = Math.floor(Math.random() * (20000)) + 1 + (combatant.initiativeBonus * 1000);
			combatants.push({
				...combatant,
				initiativeRoll
			});
		});

		combatants = combatants.sort((a, b) => {
			if(a.initiativeRoll < b.initiativeRoll){
				return 1;
			}
			if(a.initiativeRoll > b.initiativeRoll){
				return -1;
			}
			
			const playersWinTies = getState().encounter.playersWinTies; //this needs to be brought in later
			if(a.type === 'Player' && b.type === 'NPC/Monster' && playersWinTies){
				return -1;
			}
			if(a.type === 'Player' && b.type ==='NPC/Monster' && !playersWinTies){
				return 1;
			}
			if(a.type === 'NPC/Monster' && b.type === 'Player' && playersWinTies){
				return 1;
			}
			if(a.type === 'NPC/Monster' && b.type === 'Player' && !playersWinTies){
				return -1;
			}
			
			//randomly determine order
			if(Math.floor(Math.random() * 2) + 1 == 1){
				return 1
			}
			else{
				return -1
			}
		});
	
	for(let i = 0; i < combatants.length; i++){
		combatants[i].order = i + 1;
	}
	
	var mapPromise =  combatants.map((combatant) => {
		database.ref(`users/${uid}/combatants/${combatant.id}`).update(combatant)
	});
	
	Promise.all(mapPromise).then(()=> {
		console.log('done with startinitiateencounter');
		dispatch(setCombatants(combatants));
	});

	/*
	return combatants.map((combatant) => {
		database.ref(`users/${uid}/combatants/${combatant.id}`).update(combatant)
	}).then(() => {
		dispatch(setCombatants(combatants));
	});*/
	
	//return database.ref(`users/${uid}/combatants`).setValue("key": 
	
	//return combatants.forEach((combatant) => {
		//database.ref(`users/${uid}/combatants/${combatant.id}`).update(combatant);
	//}).then(() => {
		//dispatch(startSetInitialCurrentCombatant(combatants));
		//dispatch(setCombatants(combatants));		
	//});

	};
	
};

//set all combatants with a lower order and surprise to no longer be surprised
export const startNotSurpriseLowerOrderCombatants = (prevCombatantOrder = 0) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		let combatants = getState().combatants;
				
		var mapPromise =  combatants.map((combatant) => {
			if(combatant.order <= prevCombatantOrder && combatant.surprise == true){
				database.ref(`users/${uid}/combatants/${combatant.id}`).update({
					...combatant,
					surprise: false
				});
				return {
					...combatant,
					surprise: false
					};
			}
			else{
				return combatant;
			}
		});
	
		Promise.all(mapPromise).then(()=> {
			dispatch(setCombatants(mapPromise));
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