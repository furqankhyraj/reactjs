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
const store = createStore(reducers, middleware);
// store.subscribe(function(){
// console.log('current state is: ',store.getState());
// //console.log('current price: ',store.getState()[1].price);
// })
import BooksList from './components/pages/bookslist';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';
const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={BooksList} />
                <Route path="/admin" component={BooksForm} />
                <Route path="/cart" component={Cart} />
            </Route>
        </Router>
    </Provider>
)
render(
    Routes, document.getElementById('app')
);






// STEP 2 create and dispatch actions
// store.dispatch(postBooks(
//     [{
//         title: 'this is the book title',
//         description: 'this is the book description',
//         price: 33.33
//     },
//     {
//         title: 'this is the second book title',
//         description: 'this is the second book description',
//         price: 50
//     }]
// ))
// // DELETE a book
// store.dispatch(deleteBooks(
//     { _id: 1 }
// ))
// // UPDATE a book
// store.dispatch(updateBooks(
//     {
//         _id: 2,
//         title: 'Learn React in 24h'
//     }
// ))
// //-->> CART ACTIONS <<--
// // ADD to cart
// store.dispatch(addToCart([{ _id: 1 }]))