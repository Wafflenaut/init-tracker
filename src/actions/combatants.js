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
		

		/*
		tempCombatants = tempCombatants.map((combatant) => {
			//simulates rolling a 1d20 + initiative bonus, but with less granularity to avoid ties
			combatant.initiativeRoll = Math.floor(Math.random() * (20000)) + 1 + (combatant.initiativeBonus * 1000);
		});
		console.log('Combatants after init roll');
		console.log(combatants);
		*/	
		//sorts combatants first by initiative order
		//then by whichever type wins ties
		//then randomly in the event the types are the same
		combatants = combatants.sort((a, b) => {
			if(a.initiativeRoll < b.initiativeRoll){
				return -1;
			}
			if(a.initiativeRoll > b.initiativeRoll){
				return 1;
			}
			
			const playersWinTies = getState().filters.playersWinTies; //this needs to be brought in later
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

	return database.ref(`users/${uid}/combatants`).update({
			...combatants
	}).then(() => {
			dispatch(setCombatants(combatants));
	});

	};
	
};
/*	
//will set the initiative rolls and order
export const startInitiateEncounter = () => {
	
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/combatants`)
			.once('value')
			.then((snapshot) => {
				let combatants = [];
				
				snapshot.forEach((childSnapshot) => {
					const initiativeRoll = Math.floor(Math.random() * (20000)) + 1 + (childSnapshot.initiativeBonus * 1000);
					combatants.push({
						id: childSnapshot.key,
						...childSnapshot.val(),
						initiativeRoll
					});
				});
				
				//sorts combatants first by initiative order
				//then by whichever type wins ties
				//then randomly in the event the types are the same
				combatants.sort((a, b) => {
					if(a.initiativeRoll < b.initiativeRoll){
						return -1;
					}
					if(a.initiativeRoll > b.initiativeRoll){
						return 1;
					}
					
					const playersWinTies = true; //this needs to be brought in later
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

					
			});
				
				
			dispatch(setCombatants(combatants));
				
		});
		
	};
};
*/

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