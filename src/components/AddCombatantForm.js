import React from 'react';

export default class AddCombatantForm extends React.Component {
	constructor(props) {
		super(props);
			
		this.state = {
			name: props.combatant ? props.combatant.name : '',
			active: props.combatant ? props.combatant.active : true,
			surprise: props.combatant ? props.combatant.surprise : false,
			type: props.combatant ? props.combatant.type : 'NPC/Monster',
			initiativeBonus: props.combatant ? props.combatant.initiativeBonus : '',
			initiativeRoll: props.combatant ? props.combatant.initiativeRoll : 0,
			addToLibrary: props.combatant ? props.combatant.addToLibrary : false,
			error: ''
		};
	}
	
	onNameChange = (e) => {
		const name = e.target.value;
		this.setState(() => ({name}));
	};
	
	onSurpriseChange = (e) => {
		const surprise = e.target.checked;
		console.log(e.target.checked);
		console.log(surprise)
		this.setState(() => ({surprise}));
	};
	
	onTypeChange = (e) => {
		const type = e.target.value;
		this.setState(() => ({ type }));
	};
	
	onInitiativeBonusChange = (e) => {
		const initiativeBonus = e.target.value;
		this.setState(() => ({ initiativeBonus }));
	};
	
	onAddToLibraryChange = (e) => {
		this.setState(() => ({ addToLibrary }));
	};
	
	onSubmit = (e) => {
		e.preventDefault();
		
		
		if(!this.state.name || !this.state.initiativeBonus ){
			this.setState(() => ({error: 'Please provide name and initiative bonus.'}));
		}
		else {
			this.setState(() => ({error: ''}));
			this.props.onSubmit({
				name: this.state.name,
				active: this.state.active,
				surprise: this.state.surprise,
				type: this.state.type,
				initiativeBonus: this.state.initiativeBonus,
				initiativeRoll: this.state.initiativeRoll,
				addToLibrary: this.state.addToLibrary
				
			});
		}
	};
	
	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.onSubmit}>
					<p>Name</p>
					<input
						type="text"
						placeholder="Name"
						autoFocus
						value={this.state.name}
						onChange={this.onNameChange}
					/>
					<p>Active in Surprise</p>
					<input
						type="checkbox"
						name="surprise"
						onChange={this.onSurpriseChange}
					/>
					<p>Combatant Type</p>
					<select defaultValue={this.state.type} onChange={this.onTypeChange}>
						<option value="Player">Player</option>
						<option value="NPC/Monster">NPC/Monster</option>
					</select>

					<p>Initiative Bonus</p>
					<input
						type="text"
						placeholder="Initiative Bonus"
						value={this.state.initiativeBonus}
						onChange={this.onInitiativeBonusChange}
					/>
					<p>Add to Library</p>
					<input
						type="checkbox"
						name="addToLibrary"
						value={this.state.addToLibrary}
						onChange={this.onAddToLibraryChangeChange}
					/>
					<button>Add Combatant</button>
				</form>
			</div>
		)
	}
}