import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-materialize';
import './numbers-input.scss';

/**
 *
 * @param {string} value - value that comes from target.value
 * @returns if value only contains digits or not
 */
export const isOnlyDigits = (value) => {
  const parsedValue = parseInt(value, 10);
  const onlyDigitals = /^\d+$/;

  return (!!value.match(onlyDigitals) && !Number.isNaN(parsedValue) && typeof parsedValue === 'number');
};

const NumbersInput = (props) => {
  const [inputValue, setInputValue] = useState('');
  const { disabled, onKeyUp } = props;

  const onChange = (e) => {
    const { target } = e;

    if (isOnlyDigits(target.value) || target.value === '') {
      setInputValue(target.value);
      props.onChange(e);
    }
  };

  return (
    <div className="container numbers-input-container">
      <TextInput
        className="center-align numbers-input"
        placeholder="Input a number"
        value={inputValue}
        onChange={onChange}
        onKeyUp={onKeyUp}
        disabled={disabled}
      />
    </div>
  );
};

NumbersInput.propTypes = {
  onKeyUp: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

NumbersInput.defaultProps = {
  disabled: false,
};

export default NumbersInput;
