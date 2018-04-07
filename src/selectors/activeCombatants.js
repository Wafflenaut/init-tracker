//Filters for all combatants that are active
//Sorts by initiativeRoll (descending)
export const activeCombatants = ( combatants, encounter) => {

	return combatants.filter((combatant, encounter) => {
		const active = combatant.active;
		const id = combatant.id;
		const currentCombatantId = encounter.currentCombatantId ? encounter.currentCombatantId : '';
		
		return active && currentCombatantId != id;
	}).sort((a, b) => {
			return a.order - b.order;
	});
};

//returns a list with the combatants taking turns after the combatants
//followed by the combatants that took turns before the active combatant
export const orderedActiveCombatants = (combatants, encounter) => {
	let orderedCombatants = postActiveCombatants(combatants, encounter);
	console.log('Current Combatant in activeCombatants selector: ' + encounter.currentCombatantOrder);
	console.log('Post Active Combatants');
	console.log(orderedCombatants);
	orderedCombatants = orderedCombatants.concat(preActiveCombatants(combatants, encounter));
	console.log('Ordered Combatants');
	console.log(orderedCombatants);
	
	return orderedCombatants;
}

export const preActiveCombatants = ( combatants, encounter) => {
	const currentCombatantId = encounter.currentCombatantId ? encounter.currentCombatantId : '';
	const currentCombatantOrder = encounter.currentCombatantOrder ? encounter.currentCombatantOrder : '';

	return combatants.filter((combatant) => {
		const active = combatant.active;
		const id = combatant.id;
		const order = combatant.order;

		//console.log(currentCombatantId + " " + currentCombatantOrder);
		
		return active && currentCombatantId != id && order < currentCombatantOrder;
	}).sort((a, b) => {
			return a.initiativeRoll - b.initiativeRoll;
	});
};

export const postActiveCombatants = ( combatants, encounter) => {
	const currentCombatantId = encounter.currentCombatantId ? encounter.currentCombatantId : '';
	const currentCombatantOrder = encounter.currentCombatantOrder ? encounter.currentCombatantOrder : '';


	return combatants.filter((combatant) => {
		const active = combatant.active;
		const id = combatant.id;
		const order = combatant.order;
		
		return active && currentCombatantId != id && order > currentCombatantOrder;
	}).sort((a, b) => {
			return a.initiativeRoll - b.initiativeRoll;
	});
};