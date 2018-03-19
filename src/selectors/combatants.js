export const sortCombatants = ( combatants) => {
	console.log(combatants);
	return combatants.sort((a,b) => {
		return a.name < b.name ? 1 : -1;
	});
}