import React from 'react';
import { connect } from 'react-redux';
import AddCombatantForm from './AddCombatantForm';
import { startAddCombatant } from '../actions/combatants';

export class AddCombatantPage extends React.Component{

	onSubmit = (combatant) => {
		this.props.startAddCombatant(combatant);
		//if combatant.library is true - add to the library
		this.props.history.push('/');
	};

	render() {
		return(
			<div>
				<h1>Add Combatant</h1>
				<AddCombatantForm 
				onSubmit={this.onSubmit}
				/>
			</div>
		);
		
	};

};

const mapDispatchToProps = (dispatch) => ({
		startAddCombatant: (combatant) => dispatch(startAddCombatant(combatant))
});


export default connect(undefined, mapDispatchToProps)(AddCombatantPage);