import React from 'react';
import { connect } from 'react-redux';
import { CombatantListItem } from './CombatantListItem';
import { surpriseCombatants } from '../selectors/surpriseCombatants';
import { startSetCombatantActiveStatus } from '../actions/combatants';

export class SurpriseList extends React.Component{
	onClick = (id, active) => {
		this.props.startSetCombatantActiveStatus(id, active);
	};
	
	render() {
		return (
		<div className="content-container">
			<div className="list-header">
				<div>Surprise</div>
			</div>
			<div className="list-body">
				{
					this.props.combatants.length === 0 ? (
						<div>No Surprise</div>
					) : (
						this.props.combatants.map((combatant) => {
							{/*return <CombatantListItem key={combatant.id} {...combatant} />;*/}
							return <CombatantListItem key={combatant.id} {...combatant} onClick={this.onClick} />
						})
					)
				}
			</div>
		</div>
	);
	};
};

const mapDispatchToProps = (dispatch) => ({
	startSetCombatantActiveStatus: (id, active) => dispatch(startSetCombatantActiveStatus(id, active))
});

const mapStateToProps = (state, props) => {
	return {
		combatants: surpriseCombatants(state.combatants, state.encounter)
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(SurpriseList);