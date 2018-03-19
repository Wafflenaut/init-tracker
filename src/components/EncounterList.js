import React from 'react';
import { connect } from 'react-redux';
import EncounterListItem from './EncounterListItem';
import { sortCombatants } from '../selectors/combatants';

export const EncounterList = (props) => (
	<div className="content-container">
		<div className="list-header">
			<div>Combatant</div>
			<div>Surprised</div>
			<div>Type</div>
			<div>Initiative Bonus</div>
		</div>
		<div className="list-body">
			{
				props.combatants.length === 0 ? (
					<div className="list-item list-item--message">
						<span>No Combatants</span>
					</div>
				) : (
					props.combatants.map((combatant) => {
						return <EncounterListItem key={combatant.id} {...combatant} />;
					})
				)
			}
		</div>
	</div>
);


const mapStateToProps = (state) => {
	return {
		combatants: sortCombatants(state.combatants)
	};
};

export default connect(mapStateToProps)(EncounterList);