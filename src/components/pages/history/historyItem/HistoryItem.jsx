import React from 'react';
import PropTypes from 'prop-types';

import './history-item.scss';

const HistoryItem = ({ number, result }) => (
  <tr>
    <th>{number}</th>
    <th>{result}</th>
  </tr>
);

HistoryItem.propTypes = {
  number: PropTypes.number.isRequired,
  result: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default HistoryItem;
