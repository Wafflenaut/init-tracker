import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sortCombatants } from '../selectors/combatants';
import { startInitiateEncounter } from '../actions/combatants';
import { startSetPlayersWinTies, startSetInitialCurrentCombatant } from '../actions/encounter';


export class EncounterSetup extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			playersWinTies: false,
			error: ''
		};
	}
	
	onTieBreakerChange = (e) => {
		
		const playersWinTies = e.target.checked;
		console.log(`playersWinTies ${playersWinTies}`);
		this.setState(() => ({playersWinTies}));
	};
	
	onClick = (e) => {

		console.log('Encounter Starting...');
		if( this.props.combatants.length < 2 ){
			this.setState(() => ({error: 'An encounter must have at least two combatants.'}));
		}
		else {
			this.setState(() => ({error: ''}));
			this.props.startInitiateEncounter();
			this.props.startSetInitialCurrentCombatant();
			this.props.startSetPlayersWinTies(this.state.playersWinTies);

			/*
			let encounterSetupInit = new Promise(() => {
				this.props.startInitiateEncounter()
			});
			encounterSetupInit.then(() => {
				this.props.startSetInitialCurrentCombatant();
			});*/
			//this.props.startInitiateEncounter();
			
			
		}
		this.props.history.push('/encounter');
	};
	
	render() {
		
		
		return (
			<div>
			<h3>Players Win Ties:</h3>
				<input
					type="checkbox"
					name="tieBreaker"
					onChange={this.onTieBreakerChange}
				/>
			<div>
				{this.state.error && <p>{this.state.error}</p>}
			</div>
			<div>
				<button onClick={this.onClick}>Start Encounter</button>
			</div>
			</div>
		);
	}
	
};

const mapDispatchToProps = (dispatch) => ({
	startInitiateEncounter: () => dispatch(startInitiateEncounter()),
	startSetInitialCurrentCombatant: () => dispatch(startSetInitialCurrentCombatant()),
	startSetPlayersWinTies: (playersWinTies) => dispatch(startSetPlayersWinTies(playersWinTies))
});

const mapStateToProps = (state) => {
	return {
		combatants: sortCombatants(state.combatants)
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EncounterSetup));