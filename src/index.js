import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BaseLayout from './components/BaseLayout'
import Login from './components/Login'
import Register from './components/Register'
import Overview from './components/Overview'
import Detail from './components/Detail'
import Edit from './components/Edit'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import userReducer from './store/reducers/user'
import cartReducer from './store/reducers/cart'

const rootReducer = combineReducers({ userR: userReducer, cartR: cartReducer })

const store = createStore(rootReducer,
                          window.__REDUX_DEVTOOLS_EXTENSION__ &&
                          window.__REDUX_DEVTOOLS_EXTENSION__() );

ReactDOM.render(
    <Provider store={store} >
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <Route exact path ="/" component = {Login} />
            <Route path ="/register" component = {Register} />
            <Route path = "/books"  component = {Overview} />
            <Route path = "/book/:bookId" component = {Detail} />
            <Route path = "/edit/:bookId" component = {Edit} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
