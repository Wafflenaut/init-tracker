import React from 'react';
import { Link } from 'react-router-dom';
import SurpriseList from './SurpriseList';
import ActiveEncounterList from './ActiveEncounterList';
import InactiveEncounterList from './InactiveEncounterList';

const DashboardPage = () => (
  <div>
    Dashboard page content
	<Link to="/add-combatant">Add Combatant</Link>
	<SurpriseList />
	<ActiveEncounterList />
	<InactiveEncounterList />
  </div>
);

export default DashboardPage;