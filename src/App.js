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
      showSearchPage: false,
      query : ""
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({
        books
      })
    });
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
            <BookSearch  books = {this.state.books} onClick= {this.updateQuery}/>
          )}
            
          />
        ) : (
          <Route exact path='/' render ={() => (
            <div>
              <BookShelve books ={this.state.books} shelf ="currentlyReading" title = "Currently reading"/>
              <BookShelve books ={this.state.books} shelf ="wantToRead" title = "Want to read"/>
              <BookShelve books ={this.state.books} shelf ="read" title = "Read"/>
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
