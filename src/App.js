import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import BookShelve from './BookShelve.js'
import BookSearch from './BookSearch.js'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books,
        loading: false
      })
    });
  }

  handleUpdateBookShelf(book, shelf) {
    this.setState({
      loading: true
    })

    BooksAPI.update(book,shelf)
    .then(() => {
      book.shelf = shelf;
      // Update books array in the state.
      this.setState(state => ({
        books: state.books.filter((b) => b.id !== book.id).concat([book]),
        loading: false
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
          <Route path='/search' render = {() => (
            <BookSearch  
            userBooks = {this.state.books}
            updateBookShelf = {(book, shelf) => this.handleUpdateBookShelf(book, shelf)}
            />
          )}
            
          />
          <Route exact path='/' render ={() => (
            <div>
              <BookShelve
              loading = {this.state.loading}
              books ={this.state.books.filter(b => b.shelf === 'currentlyReading')} 
              title = "Currently reading"
              updateBookShelf = {(book, shelf) => this.handleUpdateBookShelf(book, shelf)}
              />

              <BookShelve 
              loading = {this.state.loading}
              books ={this.state.books.filter(b => b.shelf === 'wantToRead')}
              title = "Want to read"
              updateBookShelf = {(book, shelf) => this.handleUpdateBookShelf(book, shelf)}
              />

              <BookShelve 
              loading = {this.state.loading}
              books ={this.state.books.filter(b => b.shelf === 'read')}
              title = "Read"
              updateBookShelf = {(book, shelf) => this.handleUpdateBookShelf(book, shelf)}
              />

            </div>
          )}
          />
        </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
