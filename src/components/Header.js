import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
		<div>
			<Link className="header__title" to="/dashboard">
			  <h1>D&D Initiative Tracker</h1>
			</Link>
		</div>
		<div>
			<NavLink to="/dashboard">Dashboard</NavLink>
			<NavLink to="/encounter">Encounter</NavLink>
			<NavLink to="/library">Library</NavLink>
		</div>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
