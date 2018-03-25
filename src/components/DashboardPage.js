import React from 'react';
import { Link } from 'react-router-dom';
import EncounterList from './EncounterList';
import EncounterSetup from './EncounterSetup';

const DashboardPage = () => (
  <div>
    Dashboard page content
	<Link to="/add-combatant">Add Combatant</Link>
	<EncounterList />
	<EncounterSetup />
  </div>
);

export default DashboardPage;
