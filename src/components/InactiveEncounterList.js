import React from 'react';
import { connect } from 'react-redux';
import { CombatantListItem } from './CombatantListItem';
import { inactiveCombatants } from '../selectors/inactiveCombatants';
import { startSetCombatantActiveStatus } from '../actions/combatants';
import { startAlterActiveCombatantOrder } from '../actions/encounter';

export class InactiveEncounterList extends React.Component {
	
	onClick = (id, active) => {
		this.props.startSetCombatantActiveStatus(id, active);
		this.props.startAlterActiveCombatantOrder();
	};
	
	render() {
		return (
		<div className="content-container">
			<div className="list-header">
				<div>Inactive Combatants</div>
			</div>
			<div className="list-body">
				{
					this.props.combatants.length === 0 ? (
						<div>No Inactive Combatants</div>
					) : (
						this.props.combatants.map((combatant) => {
							return <CombatantListItem key={combatant.id} {...combatant} onClick={this.onClick} />;
						})
					)
				}
			</div>
		</div>
		)
	}
};

const mapDispatchToProps = (dispatch) => ({
	startSetCombatantActiveStatus: (id, active) => dispatch(startSetCombatantActiveStatus(id, active)),
	startAlterActiveCombatantOrder: () => dispatch(startAlterActiveCombatantOrder())
});

const mapStateToProps = (state) => {
	return {
		combatants: inactiveCombatants(state.combatants)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InactiveEncounterList);