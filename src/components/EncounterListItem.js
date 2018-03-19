import React from 'react';
import {Link} from 'react-router-dom';


const EncounterListItem = ({ dispatch, id, name, surprised, type, initiativeBonus}) => (
	<Link className="list-item" to={`/edit/${id}`}>
		<div>
			<h3 className="list-item__title">{name}</h3>
			{
				{surprised} ? (<span>Yes</span>) : (<span>No</span>)
			}
			<span>{type}</span>
			<span>{initiativeBonus}</span>
			
		</div>
	</Link>
);

export default EncounterListItem;