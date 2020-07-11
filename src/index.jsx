import React from 'react';
import ReactDOM from 'react-dom';
import App from '@components/app/App';

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import 'materialize-css';
import '@src/index.scss';
import { BrowserRouter } from 'react-router-dom';

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
