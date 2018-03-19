import React from 'react';
import { Link } from 'react-router-dom';
import EncounterList from './EncounterList'

const DashboardPage = () => (
  <div>
    Dashboard page content
	<Link to="/add-combatant">Add Combatant</Link>
	<EncounterList />
  </div>
);

export default DashboardPage;
