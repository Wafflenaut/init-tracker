import React from 'react';
import { connect } from 'react-redux';
import { CombatantListItem } from './CombatantListItem';
import { orderedActiveCombatants } from '../selectors/activeCombatants';
import { startSetCombatantActiveStatus } from '../actions/combatants';
import { encounterOrderedCombatants } from '../selectors/encounter';
import { startAlterActiveCombatantOrder } from '../actions/encounter';

export class ActiveEncounterList extends React.Component {
		
	onClick = (id, active) => {
		this.props.startSetCombatantActiveStatus(id, active);
		this.props.startAlterActiveCombatantOrder();
	};
	
	render() {
		return (
	
			<div className="content-container">
				<div className="list-header">
					<div>Combatants</div>
				</div>
				<div className="list-body">
					{
						this.props.combatants.length === 0 ? (
							<div>No Active Combatants Remaining</div>
						) : (
							this.props.combatants.map((combatant) => {
								return <CombatantListItem key={combatant.id} {...combatant} onClick={this.onClick}/>;
							})
						)
					}
				</div>
			</div>
		);
	}
};

const mapDispatchToProps = (dispatch) => ({
	startSetCombatantActiveStatus: (id, active) => dispatch(startSetCombatantActiveStatus(id, active)),
	startAlterActiveCombatantOrder: () => dispatch(startAlterActiveCombatantOrder())
});

const mapStateToProps = (state) => {
	return {
		//combatants: orderedActiveCombatants(state.combatants, state.encounter)
		combatants: encounterOrderedCombatants(state.encounter)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveEncounterList);