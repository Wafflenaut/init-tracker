//Filters for combatants that are not surprised and are active
//Sorts by initiativeRoll (descending)
export const surpriseCombatants = ( combatants, filters) => {
	const currentCombatant = filters.currentCombatant;
	return combatants.filter((combatant) => {
		const active = combatant.active;
		const surprise = combatant.surprise;
		const id = combatant.id;
		
		return active && surprise && currentCombatant != id;
	}).sort((a, b) => {
		return combatants.sort((a,b) => {
			return a.initiativeRoll > b.initiativeRoll ? 1 : -1;
		});
	});
};