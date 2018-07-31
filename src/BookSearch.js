import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksApi from './BooksAPI'

class BookSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books : [],
            noBooks: '',
            loading: false
        }
    }

    sendSelfChange(book, shelf) {
        this.props.updateBookShelf(book, shelf);
    }

    SearchForBooks(query) {
        this.setState({loading: true});
        BooksApi.search(query)
        .then(data => {
            if(!!data.error) {
                this.setState({
                    books: [],
                    noBooks: 'Sorry, there no search result for your query',
                    loading: false
                })
            }
            else {
                // compare user books with the search results.
                var withUserBooks = data.map(b => {
                    for(var i = 0; i<this.props.userBooks.length;i++) {
                        if(this.props.userBooks[i].id === b.id) {
                            // update the current shelf filed if the user book
                            // equal to the current book.
                            b.shelf = this.props.userBooks[i].shelf;
                        }
                    }
                    return b;
                });

                // update the state with the final results.
                this.setState({
                    books: withUserBooks,
                    noBooks: '',
                    loading: false
                })
            }
        })
    }

    render() {

        const {books} = this.state;

        return (
            <div>
                <div>{this.state.noBooks}</div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to='/' className="close-search" >Close</Link>
                        <div className="search-books-input-wrapper">
                            <input onChange={(event) => {this.SearchForBooks(event.target.value) }} 
                            type="text" placeholder="Search by title or author" />
                        </div>
                    </div>
                    <div className="search-books-results">
                        {!this.state.loading ? (
                            <ol className="books-grid" >
                            {
                                books.map(book => (
                                    <Book 
                                    key = {book.id}
                                    book = {book}
                                    sendSelfChange={(book,shelf) => {this.sendSelfChange(book,shelf)}}
                                    />
                                ))
                            }
                        </ol>
                        ):
                        (
                           <div>Loading...............</div> 
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default BookSearch;