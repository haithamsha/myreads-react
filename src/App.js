import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import escapeRegExp from 'escape-string-regexp'
import {Route} from 'react-router-dom'
import BookShelve from './BookShelve.js'
import BookSearch from './BookSearch.js'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showSearchPage: false
    }
  }

  componentDidMount() {
    console.log(this.state.showSearchPage);
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({
        books
      })
    });
  }

  handleUpdateBookShelf(book, shelf) {
    BooksAPI.update(book,shelf)
    .then(() => {
      book.shelf = shelf;
      // Update books array in the state.
      this.setState(state => ({
        books: state.books.filter((b) => b.id !== book.id).concat([book])
      }))
    })
  }

  render() {
    return (
      <div className="app">
      <div className="list-books">
      <div className="list-books-content">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        {this.state.showSearchPage ? (
          <Route path='/search' render = {() => (
            <BookSearch  
            userBooks = {this.state.books}
            updateBookShelf = {(book, shelf) => this.handleUpdateBookShelf(book, shelf)}
            showSearchPage = {this.state.showSearchPage}
            />
          )}
            
          />
        ) : (
          <Route exact path='/' render ={() => (
            <div>
              <BookShelve
              books ={this.state.books.filter(b => b.shelf === 'currentlyReading')} 
              title = "Currently reading"
              updateBookShelf = {(book, shelf) => this.handleUpdateBookShelf(book, shelf)}
              />

              <BookShelve 
              books ={this.state.books.filter(b => b.shelf === 'wantToRead')}
              title = "Want to read"
              updateBookShelf = {(book, shelf) => this.handleUpdateBookShelf(book, shelf)}
              />

              <BookShelve 
              books ={this.state.books.filter(b => b.shelf === 'read')}
              title = "Read"
              updateBookShelf = {(book, shelf) => this.handleUpdateBookShelf(book, shelf)}
              />

            </div>
          )}
          />
        )}
        </div>
        </div>
        <div className="open-search">
          <Link to='/search' onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
