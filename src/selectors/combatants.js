export const sortCombatants = ( combatants) => {
	return combatants.sort((a,b) => {
		return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1;
	});
};

export const currentCombatant = ( combatants, encounter) => {
	//const currCombatantId = encounter.currCombatantId ? encounter.currCombatantId : 
	console.log('current combatant');
	console.log(encounter)
	const currCombatant = combatants.filter(combatant => combatant.id === encounter.currentCombatantId);
	return currCombatant;
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