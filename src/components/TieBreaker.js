import React from 'react';

export default class TieBreaker extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			playersWinTies: false
		};
	}
	
	onTieBreakerChange = (e) => {
		const playersWinTies = e.target.value;
		this.setState(() => ({playersWinTies}));
	};
	
	render() {
		return (
			<div>
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