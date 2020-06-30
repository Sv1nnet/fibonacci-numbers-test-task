import React from 'react';
import PropTypes from 'prop-types';

import './result.scss';

const Result = ({ result, error }) => (
  <div className="results-container">
    <h3 className="center-align">Result:</h3>
    <h4 className={`center-align result-text ${error ? 'red-text accent-4' : ''}`}>{result}</h4>
  </div>
);

Result.propTypes = {
  result: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  error: PropTypes.bool,
};

Result.defaultProps = {
  result: null,
  error: false,
};

export default Result;
