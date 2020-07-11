import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Nav from '@components/nav/Nav';
import MainPage from '@components/pages/main/MainPage';
import History from '@components/pages/history/History';

const App = () => (
  <>
    <Nav />
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/history">
        <History />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </>
);

export default App;
