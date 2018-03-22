import { connect } from 'react-redux';
import React from 'react';
import {Link} from 'react-router-dom';
import { startEditCombatant } from '../actions/combatants';


export class CombatantListItem extends React.Component {
	constructor(props){
		super(props);
		
	}
	
	onClick = () => {
		const active = !this.props.combatant.active;
		this.props.oncClick(this.props.combatant.id, active);
	}
	
	render() {
		return (
				<div>
					<h3 className="list-item__title">{this.props.combatant.name}</h3>
					{
						active ? (<button onClick={this.onClick}>Remove From Combat</button>) : 
							(<button onClick={this.onClick}>Return to Combat</button>)
					}
				</div>
		)
	}
}
/*
const mapDispatchToProps = (dispatch, props) => ({
		startEditCombatant: (id, expense) => dispatch(startEditExpense(id, expense))
});

const mapStateToProps = (state, props) => {
	console.log(props);
	return {
		combatant: state.combatants.find((combatant) => combatant.id === props.match.params.id)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CombatantListItem);
*/
/*
const CombatantListItem = ({ dispatch, id, name, active, initiativeRoll}) => (
	<Link className="list-item" to={`/edit/${id}`}>
		<div>
			<h3 className="list-item__title">{name}</h3>
			{
				active ? (<button>Remove From Combat</button>) : 
					(<button>Return to Combat</button>)
			}
		</div>
	</Link>
);

export default CombatantListItem;
*/