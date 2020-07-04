import React from 'react';
import { Link } from 'react-router-dom';

import './nav.scss';

const Nav = () => (
  <nav className="light-green darken-3">
    <div className="nav-wrapper">
      <h4 className="center nav-text">
        <Link to="/">Fibonacci numbers</Link>
      </h4>
    </div>
  </nav>
);

export default Nav;
