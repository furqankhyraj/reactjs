// ADD to cart
"use strict"
import axios from 'axios';

// ADD to cart
export function addToCart(cart) {
    return function (dispatch) {
        axios.post("/api/cart", cart)
            .then(function (response) {
                dispatch({
                    type: "ADD_TO_CART",
                    payload: response.data
                })
            })
            .catch(function (err) {
                dispatch({
                    type: "ADD_TO_CART_REJECTED",
                    payload: "Unable to add book in cart"
                })
            })
    }

    // return {
    //     type: "ADD_TO_CART",
    //     payload: book
    // }
}

export function getCart() {
    return function (dispatch) {
        axios.get("/api/cart")
            .then(function (response) {
                dispatch({
                    type: "GET_CART",
                    payload: response.data
                })
            })
            .catch(function (err) {
                dispatch({
                    type: "GET_CART_REJECTED",
                    payload: "Unable to fetch cart from API"+err
                })
            })
    }
}

// UPDATE CART
export function updateCart(_id, unit, cart) {
    // Create a copy of the current array of books
    const currentBookToUpdate = cart;
    // Determine at which index in books array is the book to be deleted
    const indexToUpdate = currentBookToUpdate.findIndex(
        function (book) {
            return book._id === _id;
        }
    )
    const newBookToUpdate = { ...currentBookToUpdate[indexToUpdate], quantity: currentBookToUpdate[indexToUpdate].quantity + unit }
    let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]

    return function (dispatch) {
        axios.post("/api/cart", cartUpdate)
            .then(function (response) {
                dispatch({
                    type: "UPDATE_CART",
                    payload: response.data
                })
            })
            .catch(function (err) {
                dispatch({
                    type: "UPDATE_CART_REJECTED",
                    payload: "Unable to add book in cart"
                })
            })
    }
    // return {
    //     type: "UPDATE_CART",
    //     // _id: _id,
    //     // unit: unit
    //     payload: cartUpdate
    // }
}

export function deleteCartItem(cart) {
    return function (dispatch) {
        axios.post("/api/cart", cart)
            .then(function (response) {
                dispatch({
                    type: "DELETE_CART_ITEM",
                    payload: response.data
                })
            })
            .catch(function (err) {
                dispatch({
                    type: "DELETE_CART_ITEM_REJECTED",
                    payload: "Unable to delete item from cart"+err
                })
            })
    }
}