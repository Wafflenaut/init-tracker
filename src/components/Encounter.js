import React from 'react';
import { Link } from 'react-router-dom';
import SurpriseList from './SurpriseList';
import TieBreaker from './TieBreaker';

const DashboardPage = () => (
  <div>
    Dashboard page content
	<Link to="/add-combatant">Add Combatant</Link>
	<SurpriseList />
  </div>
);

export default DashboardPage;