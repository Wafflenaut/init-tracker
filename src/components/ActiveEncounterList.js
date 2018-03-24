import React from 'react';
import { connect } from 'react-redux';
import { CombatantListItem } from './CombatantListItem';
import { encounterCombatants } from '../selectors/encounterCombatants';
import { startSetCombatantActiveStatus } from '../actions/combatants';

export class ActiveEncounterList extends React.Component {
		
	onClick = (id, active) => {
		this.props.startSetCombatantActiveStatus(id, active);
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
	startSetCombatantActiveStatus: (id, active) => dispatch(startSetCombatantActiveStatus(id, active))
});

const mapStateToProps = (state) => {
	return {
		combatants: encounterCombatants(state.combatants)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveEncounterList);