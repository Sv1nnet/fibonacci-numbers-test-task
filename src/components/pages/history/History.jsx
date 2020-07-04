import React, { useState, useEffect } from 'react';
import RedirectButton from '@components/ui/buttons/redirectButton/RedirectButton';
import HistoryItem from '@components/pages/history/historyItem/HistoryItem';
import { Pagination } from 'react-materialize';
import Icon from '@components/ui/icons/arrow/Icon';
import { useGetHistory } from '@/hooks/api/apiHooks';

import './history.scss';

const History = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [{
    data = {
      results: [],
      maxPages: 1,
      page: 1,
    },
    loading,
    error,
  }, getHistory] = useGetHistory();

  useEffect(() => {
    getHistory(pageNumber);
  }, [pageNumber, getHistory]);

  return (
    <div className="history">
      {
        data.results.length > 0
          ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th className="history-list-item--result-header">Results</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    data.results.map((res) => (
                      <HistoryItem key={res.id} number={res.number} result={res.result} />
                    ))
                  }
                </tbody>
              </table>
              <Pagination
                className="history-pag"
                activePage={pageNumber}
                items={data.maxPages}
                leftBtn={<Icon />}
                maxButtons={8}
                rightBtn={<Icon className="arrow-right" />}
                onSelect={setPageNumber}
              />
              {loading && <p className="history-loading">Loading...</p>}
            </>
          )
          : (
            <p className={`history-loading ${error ? 'red-text accent-4' : ''}`}>
              {
                (function defineHistoryLoadingContent() {
                  let historyLoadingContent = 'Loading...';

                  if (error) historyLoadingContent = error.message || error.statusText || 'Unexpected Error';
                  else if (!loading) historyLoadingContent = 'You have no calculations yet';

                  return historyLoadingContent;
                }())
              }
            </p>
          )
      }
      <RedirectButton className="history-redir-btn" to="/" text="Back to main" />
    </div>
  );
};

export default History;
