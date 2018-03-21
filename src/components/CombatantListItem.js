import React from 'react';
import {Link} from 'react-router-dom';


const CombatantListItem = ({ dispatch, id, name, initiativeRoll}) => (
	<Link className="list-item" to={`/edit/${id}`}>
		<div>
			<h3 className="list-item__title">{name}</h3>
			<button>Remove From Combat</button>
		</div>
	</Link>
);

export default CombatantListItem;