import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BaseLayout from './components/BaseLayout'
import Overview from './components/Overview';
import Detail from './components/Detail'
import Edit from './components/Edit'

ReactDOM.render(
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route exact path = "/"  component = {Overview} />
          <Route path = "/book/:bookId" component = {Detail} />
          <Route path = "/edit/:bookId" component = {Edit} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
