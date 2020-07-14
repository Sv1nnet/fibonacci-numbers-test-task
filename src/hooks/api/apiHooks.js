import { useCallback } from 'react';
import config from '../../../vars.config';
import useRequest from '../useRequest';

const IP = config.SERVER_IP;

/**
 * Get users history.
 * @returns {[
 *  {
 *   loading: boolean,
 *   success: null | { status: number, statusText: string },
 *   error: null | { message: string | undefined, status: number, statusText: string },
 *   data: any,
 *   response: any
 *  },
 *  Function
 * ]}
 */
export const useGetHistory = () => {
  const [requestData, makeRequest] = useRequest();

  const getHistory = useCallback((page) => makeRequest(`${IP}/history?p=${page}`), [makeRequest]);

  return [requestData, getHistory];
};

/**
 * Send number for calculation and get result.
 * @returns {[
 *  {
 *   loading: boolean,
 *   success: null | { status: number, statusText: string },
 *   error: null | { message: string | undefined, status: number, statusText: string },
 *   data: any,
 *   response: any
 *  },
 *  Function
 * ]}
 */
export const useSendNumber = () => {
  const [requestData, makeRequest] = useRequest();

  const getResult = useCallback((number) => makeRequest({
    url: `${IP}/calc`,
    method: 'POST',
    data: {
      number,
    },
  }), [makeRequest]);

  return [requestData, getResult];
};
