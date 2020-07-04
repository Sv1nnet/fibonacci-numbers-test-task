import { useCallback } from 'react';
import useRequest from '../useRequest';

const IP = 'http://192.168.0.15:8081';

export const useGetHistory = () => {
  const [requestData, makeRequest] = useRequest();

  const getHistory = useCallback((page) => makeRequest(`${IP}/history?p=${page}`), [makeRequest]);

  return [requestData, getHistory];
};

export const useSendNumber = () => {
  const [requestData, makeRequest] = useRequest();

  const getResult = (number) => makeRequest({
    url: `${IP}/calc`,
    method: 'POST',
    data: {
      number,
    },
  });

  return [requestData, getResult];
};
