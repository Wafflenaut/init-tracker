//Filters for all combatants that are active
//Sorts by initiativeRoll (descending)
export const encounterCombatants = ( combatants) => {

	return combatants.filter((combatant) => {
		const active = combatant.active;
		
		return active;
	}).sort((a, b) => {
		return combatants.sort((a,b) => {
			return a.initiativeRoll > b.initiativeRoll ? 1 : -1;
		});
	});
};