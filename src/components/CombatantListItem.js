import React from 'react';
import {Link} from 'react-router-dom';


const ExpenseListItem = ({ dispatch, id, name, initiativeRoll}) => (
	<Link className="list-item" to={`/edit/${id}`}>
		<div>
			<h3 className="list-item__title">{name}</h3>
			<span className="list-item__subtitle">{initiativeRoll}</span>
		</div>
	</Link>
);

export default ExpenseListItem;