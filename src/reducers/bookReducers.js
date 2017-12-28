"use strict"

export function booksReducers(state = { books: [] }, action) {
    switch (action.type) {
        case "POST_BOOK":
            console.log('postbook = ', action.payload);
            return { ...state, books: [...state.books, ...action.payload], msg: 'Saved!, Click ok to continue', style: 'success', validation: 'success' }
            break;
        case "POST_BOOK_REJECTED":
            console.log('post book rejected');
            return { ...state, msg: 'Failed, Try again', style: 'danger', validation: 'error' }
            break;
        case "RESET_BUTTON":
            console.log('reset button reducer');
            return { ...state, msg: '', style: 'primary', validation:null }
            break;
        case "GET_BOOK":
            console.log('getbook = ', action.payload);
            return { books: [...state.books, ...action.payload] }
            break;
        case "DELETE_BOOK":
            // Create a copy of the current array of books
            const currentBookToDelete = [...state.books]
            // Determine at which index in books array is the book to be deleted
            const indexToDelete = currentBookToDelete.findIndex(
                function (book) {
                    return book._id === action.payload;
                }
            )
            //use slice to remove the book at the specified index
            return {
                books:
                    [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]
            }
            break;
        case "UPDATE_BOOK":
            console.log('before update', [...state])
            const currentBookToUpdate = [...state.books]
            console.log('book to update', [...state.books]);
            console.log('payload details', action.payload);

            const indexToUpdate = currentBookToUpdate.findIndex(
                function (book) {
                    console.log('in function loop', book);
                    return book._id === action.payload._id
                }
            )
            // Create a new book object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread but we could use concat methos too
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate], title: action.payload.title
            }

            // This Log has the purpose to show you how newBookToUpdate looks like
            console.log("what is it newBookToUpdate", newBookToUpdate);
            //use slice to remove the book at the specified index, replace with the new object and concatenate witht he rest of items in the array
            // 0 to index + newbook + rest of the books
            return {
                books:
                    [
                        ...currentBookToUpdate.slice(0, indexToUpdate),
                        newBookToUpdate,
                        ...currentBookToUpdate.slice(indexToUpdate + 1)
                    ]
            }
            break;
            // Below code is furqan's practise code
            // console.log(indexToUpdate);
            // const singleBookToUpdate = currentBookToUpdate[indexToUpdate];
            // singleBookToUpdate.title = action.payload.title;
            // console.log('book to update', singleBookToUpdate);
            // currentBookToUpdate[indexToUpdate] = singleBookToUpdate;
            // console.log('currentBookToUpdate new value = ', currentBookToUpdate);
            // return {
            //     books: [...currentBookToUpdate]
            // }

            break;
    }
    return state
}