export const sortCombatants = ( combatants) => {
	return combatants.sort((a,b) => {
		return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1;
	});
};

export const currentCombatant = ( combatants, encounter) => {
	//const currCombatantId = encounter.currCombatantId ? encounter.currCombatantId : 
	
	console.log(encounter)
	const currentCombatantId = encounter.currentCombatantId ? encounter.currentCombatantId : '';
	const currCombatant = combatants.filter(combatant => combatant.id === currentCombatantId);
	if(currCombatant.length > 0){
		return currCombatant[0];
	}
	else{
		return null;
	}
};

export const initialCurrentCombatant = (combatants) => {

	let tempCombatants = combatants.filter((combatant) => (combatant.surprise == true));
	if(tempCombatants.length > 0){
		tempCombatants.sort((a,b) => {b.initiativeRoll-a.initiativeRoll});
		return tempCombatants[0];
	}
	else{
		tempCombatants = combatants.sort((a,b) => {b.initiativeRoll-a.initiativeRoll});
		return tempCombatants[0];
	}
};