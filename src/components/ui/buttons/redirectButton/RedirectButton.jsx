import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-materialize';

import './redirect-btn.scss';

const RedirectButton = ({ className, text, to }) => (
  <div className="redirect-btn-container">
    <Link className={`redirect-btn ${className}`} to={to}>
      <Button className="light-green darken-3">{text}</Button>
    </Link>
  </div>
);

RedirectButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

RedirectButton.defaultProps = {
  className: '',
};

export default RedirectButton;
