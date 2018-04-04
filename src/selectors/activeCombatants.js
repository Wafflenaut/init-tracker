//Filters for all combatants that are active
//Sorts by initiativeRoll (descending)
export const activeCombatants = ( combatants, encounter) => {

	return combatants.filter((combatant, encounter) => {
		const active = combatant.active;
		const id = combatant.id;
		const currentCombatantId = encounter.currentCombatantId ? encounter.currentCombatantId : '';
		
		return active && currentCombatantId != id;
	}).sort((a, b) => {
		return combatants.sort((a,b) => {
			return a.initiativeRoll > b.initiativeRoll ? -1 : 1;
		});
	});
};