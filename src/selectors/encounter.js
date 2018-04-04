export const encounterOrderedCombatants = (encounter) => {

	const orderedCombatants = encounter.orderedCombatants ? encounter.orderedCombatants : [];
	
	return orderedCombatants;
};