import React from 'react';
import { connect } from 'react-redux';
import CombatantListItem from './CombatantListItem';
import { surpriseCombatants } from '../selectors/surpriseCombatants';

export const surpriseList = (props) => (
	<div className="content-container">
		<div className="list-header">
			<div>Surprise</div>
		</div>
		<div className="list-body">
			{
				props.combatants.length === 0 ? (
					<div>No Surprise</div>
				) : (
					props.combatants.map((combatant) => {
						{/*return <CombatantListItem key={combatant.id} {...combatant} />;*/}
						return <CombatantListItem key={combatant.id} combatant />
					})
				)
			}
		</div>
	</div>
);


const mapStateToProps = (state, props) => {
	return {
		combatants: surpriseCombatants(state.combatants, state.filters)
	};
};


export default connect(mapStateToProps)(surpriseList);