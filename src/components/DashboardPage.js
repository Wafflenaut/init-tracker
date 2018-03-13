import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => (
  <div>
    Dashboard page content
	<Link to="/add-combatant">Add Combatant</Link>
  </div>
);

export default DashboardPage;
