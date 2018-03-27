export const sortCombatants = ( combatants) => {
	console.log(combatants);
	return combatants.sort((a,b) => {
		return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1;
	});
};

export const currentCombatant = ( combatants, filters) => {
	console.log(filters);
	const currCombatant = combatants.filter(combatant => combatant.id == filters.currentCombatantId);
	console.log(currCombatant);
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