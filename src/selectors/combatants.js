export const sortCombatants = ( combatants) => {
	console.log(combatants);
	return combatants.sort((a,b) => {
		return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1;
	});
};

export const currentCombatant = ( combatants, filters) => {
	return combatants.filter((combatant) => {
		return combatant.id == filters.currentCombatantId;
	});
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