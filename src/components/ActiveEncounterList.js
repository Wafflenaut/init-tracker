import React from 'react';
import { connect } from 'react-redux';
import CombatantListItem from './CombatantListItem';
import { encounterCombatants } from '../selectors/encounterCombatants';

export const ActiveEncounterList = (props) => (
	<div className="content-container">
		<div className="list-header">
			<div>Combatants</div>
		</div>
		<div className="list-body">
			{
				props.combatants.length === 0 ? (
					<div>No Active Combatants Remaining</div>
				) : (
					props.combatants.map((combatant) => {
						return <CombatantListItem key={combatant.id} {...combatant} />;
					})
				)
			}
		</div>
	</div>
);


const mapStateToProps = (state) => {
	return {
		combatants: encounterCombatants(state.combatants)
	};
};

export default connect(mapStateToProps)(ActiveEncounterList);