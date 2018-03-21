import React from 'react';
import { connect } from 'react-redux';
import CombatantListItem from './CombatantListItem';
import { inactiveCombatants } from '../selectors/inactiveCombatants';

export const ActiveEncounterList = (props) => (
	<div className="content-container">
		<div className="list-header">
			<div>Inactive Combatants</div>
		</div>
		<div className="list-body">
			{
				props.combatants.length === 0 ? (
					<div></div>
				) : (
					props.combatants.map((combatant) => {
						return <CombatantListItem key={combatant.id} combatant={this.props.combatant} />;
					})
				)
			}
		</div>
	</div>
);


const mapStateToProps = (state) => {
	return {
		combatants: inactiveCombatants(state.combatants)
	};
};

export default connect(mapStateToProps)(ActiveEncounterList);