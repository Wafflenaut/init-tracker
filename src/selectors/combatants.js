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