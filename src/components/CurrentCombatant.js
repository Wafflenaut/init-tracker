import React from 'react';
import { connect } from 'react-redux';
import { CombatantListItem } from './CombatantListItem';
import { currentCombatant } from '../selectors/combatants';
import { startSetCombatantActiveStatus } from '../actions/combatants';

export class SurpriseList extends React.Component{
	onClick = (id, active) => {
		this.props.startSetCombatantActiveStatus(id, active);
	};
	
	render() {
		return (
		<div className="content-container">
			<div className="list-header">
				<div>Current Combatant</div>
			</div>
			<div className="list-body">
				{
					this.props.combatant ? (
						<div>
							<h3>{this.props.combatant.name}</h3>
							<button>Remove From Combat</button>
							<button>End Turn</button>
						</div>
					) : (
						<div>No Active Combatant</div>
					)
			
				}
			</div>
		</div>
	);
	};
};

//set inactive then end turn
//end turn
const mapDispatchToProps = (dispatch) => ({
	startSetCombatantActiveStatus: (id, active) => dispatch(startSetCombatantActiveStatus(id, active))
});

const mapStateToProps = (state, props) => {
	return {
		combatant: currentCombatant(state.combatants, state.filters)
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(SurpriseList);