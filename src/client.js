"use strict"
// REACT
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';
// IMPORT ACTIONS
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/booksActions';
import Menu from './components/menu';
import Footer from './components/footer';
// STEP 1 create the store
const middleware = applyMiddleware(thunk, logger);

const initialState = window.INITIAL_STATE;


const store = createStore(reducers, initialState, middleware);


import routes from './routes';
const Routes = (
    <Provider store={store}>
        {routes}
    </Provider>
)
render(
    Routes, document.getElementById('app')
);