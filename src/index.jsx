import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '@components/app/App';

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import 'materialize-css';
import '@src/index.scss';

const rootEl = document.getElementById('root');
const indexComponent = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if (rootEl) {
  ReactDOM.render(
    indexComponent,
    rootEl,
  );
}

export default indexComponent;
