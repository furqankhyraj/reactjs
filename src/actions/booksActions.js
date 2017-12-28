"use strict"
import axios from 'axios';

// POST A BOOK

export function getBooks() {
    return function(dispatch){
        axios.get('/api/books')
        .then(function(response){
            dispatch({
                type: "GET_BOOK",
                payload: response.data
            })
        })
        .catch(function(err){
            dispatch({
                type: "GET_BOOK_REJECTED",
                payload: "Error while fetching list of books from API"+err
            })
        })
    }
    // return {
    //     type: "GET_BOOK",
    //     payload: [{
    //         _id: 1,
    //         title: 'this is the book title',
    //         description: 'this is the book description',
    //         price: 33.33
    //     },
    //     {
    //         _id: 2,
    //         title: 'this is the second book title',
    //         description: 'this is the second book description',
    //         price: 50
    //     }]
    // }
}
export function postBooks(book) {
    // this is redux-thunk feature to return function instead of object
    // return {
    //     type: "POST_BOOK",
    //     payload: book
    // }
    return function(dispatch){
        axios.post("/api/books",book)
        .then(function (response){
            dispatch({
                type: "POST_BOOK",
                payload: response.data
            })
        })
        .catch(function(err){
            dispatch({
                type: "POST_BOOK_REJECTED",
                payload: "There was an error while posting book"+err
            })
            // console.log('error while posting book',err)
        })
    }
}
// DELETE A BOOK
export function deleteBooks(_id) {
    // before thunk
    // return {
    //     type: "DELETE_BOOK",
    //     payload: _id
    // }
    // After thunk
    return function(dispatch){
        axios.delete('/api/books/'+_id)
        .then(function(response){
            dispatch({
                type: "DELETE_BOOK",
                payload: _id
            })
        })
        .catch(function(err){
            dispatch({
                type: "DELTE_BOOK_REJECTED",
                payload: "Error while deleting book "+err
            })
        })
    }
}
// UPDATE A BOOK
export function updateBooks(book) {
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}

// Reset Book Form
export function resetButton() {
    return {
        type: "RESET_BUTTON"
    }
}