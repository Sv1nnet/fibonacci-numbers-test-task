import React from 'react';
import PropTypes from 'prop-types';

import './icon.scss';

const Icon = ({ className }) => (
  <span className={`arrow-icon ${className}`} />
);

Icon.propTypes = {
  className: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
