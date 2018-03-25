import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EncounterList from './EncounterList';
import EncounterSetup from './EncounterSetup';

const DashboardPage = () => (
  <div>
    Dashboard page content
	<Link to="/add-combatant">Add Combatant</Link>
	<EncounterList />
	<EncounterSetup history={history} />
  </div>
);

export default DashboardPage;

