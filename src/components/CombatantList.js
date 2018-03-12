import React from 'react';
import { connect } from 'react-redux';
import CombatantListItem from './CombatantListItem'
import selectCombatants from '../selectors/combatants'

export const CombatantList = (props) => (
	<div className="content-container">
		<div className="list-header">
			<div className="show-for-mobile">Order</div>
			<div className="show-for-desktop">Combatant</div>
			<div className="show-for-desktop">Initiative Roll</div>
		</div>
		<div className="list-body">
			{
				props.combatants.length === 0 ? (
					<div className="list-item list-item--message">
						<span>No Combatants</span>
					</div>
				) : (
					props.combatants.map((combatant) => {
						return <CombatantListItem key={combatant.id} {...combatant} />;
					})
				)
			}
		</div>
	</div>
);

const mapStateToProps = (state) => {
	return {
		expenses: selectCombatants(state.combatants, state.filters)
	};
};

export default connect(mapStateToProps)(CombatantList);