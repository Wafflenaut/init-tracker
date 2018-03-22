import React from 'react';
import { connect } from 'react-redux';
import AddCombatantForm from './AddCombatantForm';
import { startAddCombatant } from '../actions/combatants';
import { startUpdateLibrary } from '../actions/library';

export class AddCombatantPage extends React.Component{

	onSubmit = (combatant) => {
		//this.props.startAddCombatant(combatant);
		//if combatant.library is true - add to the library
		this.props.startAddCombatant(combatant).then(() => {
			console.log(combatant.addToLibrary);
			console.log(combatant);
			if(combatant.addToLibrary){
				console.log(combatant.addToLibrary);
				this.props.startUpdateLibrary(combatant);
			}
		});
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
		startAddCombatant: (combatant) => dispatch(startAddCombatant(combatant)),
		startUpdateLibrary: (combatant) => dispatch(startUpdateLibrary(combatant))
});


export default connect(undefined, mapDispatchToProps)(AddCombatantPage);