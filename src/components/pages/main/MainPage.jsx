import React, { useState, useEffect } from 'react';
import NumbersInput from '@components/ui/inputs/numbersInput/NumbersInput';
import Result from '@components/result/Result';
import RedirectButton from '@components/ui/buttons/redirectButton/RedirectButton';
import { useSendNumber } from '@src/hooks/api/apiHooks';

const MAX_NUMBER = 1476;

const MainPage = () => {
  const [number, setNumber] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [{ data, loading, error }, getResult] = useSendNumber();

  const sendCalcRequest = () => {
    if (number !== null && number >= 0) {
      if (number < MAX_NUMBER) {
        setErrorMessage('');
        getResult(number);
      } else {
        setErrorMessage(`Number can't be greater than ${MAX_NUMBER}`);
      }
    }
  };

  // This handler only executes if target.value is a number or empty string
  const onChange = (e) => {
    const { target } = e;

    if (target.value !== '') setNumber(parseInt(target.value, 10));
    else setNumber(null);
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter') sendCalcRequest();
  };

  useEffect(() => {
    if (error) setErrorMessage(error.message || error.statusText || '');
  }, [error]);

  return (
    <div>
      {
        errorMessage || error
          ? <Result error result={errorMessage} />
          : <Result result={loading && !error ? 'Calculating...' : data} />
      }
      <NumbersInput onKeyUp={onKeyUp} onChange={onChange} disabled={loading} />
      <p className="center-align">Press Enter to calculate</p>
      <RedirectButton to="history" text="View previous results" />
    </div>
  );
};

export default MainPage;
