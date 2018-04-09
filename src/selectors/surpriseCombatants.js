//Filters for combatants that are not surprised and are active
//Sorts by initiativeRoll (descending)
export const surpriseCombatants = ( combatants, encounter) => {

	return combatants.filter((combatant) => {
		const active = combatant.active;
		const surprise = combatant.surprise;
		const id = combatant.id;
		const currentCombatantId = encounter.currentCombatantId ? encounter.currentCombatantId : '';
		
		return active && surprise && currentCombatantId != id;
	}).sort((a, b) => {
			if(a.order > b.order){
				return 1;
			}
			else if(a.order < b.order){
				return -1;
			}
			return 0;
	});
};