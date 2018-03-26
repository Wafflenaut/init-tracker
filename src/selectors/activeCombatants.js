//Filters for all combatants that are active
//Sorts by initiativeRoll (descending)
export const activeCombatants = ( combatants, filters) => {

	return combatants.filter((combatant, filters) => {
		const active = combatant.active;
		const id = combatant.id;
		
		return active &&  filters.currentCombatantId != id;
	}).sort((a, b) => {
		return combatants.sort((a,b) => {
			return a.initiativeRoll > b.initiativeRoll ? -1 : 1;
		});
	});
};