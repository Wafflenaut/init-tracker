import React from 'react';
import { Link } from 'react-router-dom';
import EncounterList from './EncounterList';
import TieBreaker from './TieBreaker';

const DashboardPage = () => (
  <div>
    Dashboard page content
	<Link to="/add-combatant">Add Combatant</Link>
	<EncounterList />
	<TieBreaker />
  </div>
);

export default DashboardPage;
