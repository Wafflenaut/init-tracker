import React from 'react';
import { connect } from 'react-redux';
import { CombatantListItem } from './CombatantListItem';
import { currentCombatant } from '../selectors/combatants';
import { startSetCombatantActiveStatus } from '../actions/combatants';
import { startSetNextCombatant } from '../actions/encounter';

export class CurrentCombatant extends React.Component{
	onClickActive = () => {
		this.props.startSetCombatantActiveStatus(this.props.combatant.id, !this.props.combatant.active);
		this.props.startSetNextCombatant();
		//need to remove surprise (check to see if there are any surprised list is empty, and if current is not surprised... 
		//if so, remove all surprised (this targets inactive combatants that may have had surprise round actions unused
	};
	
	onClickEndTurn = () => {
		this.props.startSetNextCombatant();
		//need to remove surprise
	};
		
	
	
	render() {
		return (
		<div className="content-container">
			<div className="list-header">
				<div>Current Combatant</div>
			</div>
			<div className="list-body">
				{
					this.props.combatant && this.props.combatant.active ? (
						<div>
							<h3>{this.props.combatant.name}</h3>
							<button onClick={this.onClickActive}>Remove From Combat</button>
							<button onClick={this.onClickEndTurn}>End Turn</button>
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
	startSetCombatantActiveStatus: (id, active) => dispatch(startSetCombatantActiveStatus(id, active)),
	startSetNextCombatant: () => dispatch(startSetNextCombatant())
});

const mapStateToProps = (state, props) => {
	return {
		combatant: currentCombatant(state.combatants, state.encounter)
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(CurrentCombatant);