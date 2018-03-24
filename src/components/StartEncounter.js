import React from 'react';
import { connect } from 'react-redux';
import { sortCombatants } from '../selectors/combatants';

export default class StartEncounter extends React.Component {
	
	onSubmit = (e) => {
		e.preventDefault();
		
		if(this.props.combatants.length === 0){
			this.setState(() => ({error: 'An encounter needs to include at least two combatants.'}));
		}
		else {
			//set all the initiatives
			//reroute to encounter
		}
	};
	
	render() {
		return (
			<div>
			<h3>Players Win Ties:</h3>
				<input
					type="checkbox"
					name="tieBreaker"
					value={this.state.playerWinsTies}
					onChange={this.onTieBreakerChange}
				/>
			</div>
		);
	}
	
}

const mapStateToProps = (state) => {
	return {
		combatants: sortCombatants(state.combatants)
	};
};

export default connect(mapStateToProps)(StartEncounter);