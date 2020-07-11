import React from 'react';
import PropTypes from 'prop-types';

// import rrd from 'react-router-dom';
const rrd = require('react-router-dom');
// Just render plain div with its children
rrd.BrowserRouter = ({ children }) => <>{children}</>;

rrd.BrowserRouter.propTypes = {
  children: PropTypes.elementType.isRequired,
};

module.exports = rrd;
