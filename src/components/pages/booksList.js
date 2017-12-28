"use strict"
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { getBooks } from '../../actions/booksActions';
import BookItem from './bookItem';
import BookForm from './booksForm';
import Cart from './cart';
class BooksList extends React.Component {
    componentDidMount() {
        this.props.getBooks();
    }
    render() {
        const booksList = this.props.books.map(function (booksArr) {
            return (
                <Col xs={12} sm={6} md={4}
                    key={booksArr._id}>
                    <BookItem
                        _id={booksArr._id}
                        title={booksArr.title}
                        description={booksArr.description}
                        price={booksArr.price} 
                        images = {booksArr.images}
                        />
                </Col>
            )
        })
        return (
            <Grid>
                <Row>
                    <Cart />
                </Row>
                <Row>                   
                    {booksList}
                </Row>
            </Grid>
        )
    }
}
function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBooks: getBooks
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksList);