import { surpriseCombatants } from './surpriseCombatants';
import { activeCombatants } from './activeCombatants';

export const encounterOrderedCombatants = (encounter) => {

	const orderedCombatants = encounter.orderedCombatants ? encounter.orderedCombatants : [];
	
	return orderedCombatants;
};

export const encounterNextCombatant = (combatants, encounter, prevCombatantOrder) => {

		let nextCombatant = {};
		const surpriseCombatantsList = surpriseCombatants(combatants, encounter);
		
		if(surpriseCombatantsList.length > 0){
			console.log('Surprise list length' + surpriseCombatants.length);
			nextCombatant.id = surpriseCombatantsList[0].id;
			nextCombatant.order = surpriseCombatantsList[0].order;
		}
		else{
			const activeCombatantsList = activeCombatants(combatants, encounter);
			console.log('Is this sorted');
			console.log(activeCombatantsList);
			if(activeCombatantsList.length > 0){
				const eligibleActiveCombatantsList = activeCombatantsList.filter(combatant => combatant.order > prevCombatantOrder);
				if(eligibleActiveCombatantsList.length > 0){
					//console.log('eligible active combatants: ' + prevCombatantOrder)
					nextCombatant.id = eligibleActiveCombatantsList[0].id;
					nextCombatant.order = eligibleActiveCombatantsList[0].order;
				}
				else{
					nextCombatant.id = activeCombatantsList[0].id;
					nextCombatant.order = activeCombatantsList[0].order;
				}
			}
			else{
				//no remaining active combatants
				nextCombatant.id = '';
				nextCombatant.order = 0;
			}
		}
		
		//console.log('nextCombatantId: ' + nextCombatantId);
		console.log('nextCombatantOrder: ' + nextCombatantOrder);

		return nextCombatant;
}