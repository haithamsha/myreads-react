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
    if(!this.state.showSearchPage) {
      BooksAPI.getAll().then((books) => {
        console.log(books);
        this.setState({
          books
        })
      });
    }
    else {
      this.setState({
        showSearchPage : true
      })
    }
  }

  // componentWillUnmount() {
  //   if(this.state.showSearchPage) { 
  //     this.setState({
  //       books: []
  //     })
  //   }
  // }

  updateQuery(query) {
    if(!this.state.showSearchPage) {
      BooksAPI.getAll().then((books) => {
        console.log(books);
        this.setState({
          books
        })
      })
    }

    else {
      this.setState({
        query: query
      });
  
      const match = new RegExp(escapeRegExp(query),'i');
       
      BooksAPI.search(query).then((books) => {
        console.log("s", books);
         if(books != undefined) {
          this.setState({
            books: books.filter((b) => match.test(b.title))
          })
         }
      })
    }
  }

  search() {
    BooksAPI.search(this.state.query).then((books) => {
      this.setState({
        books
      })
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
            <BookSearch  books = {this.state.books} onClick= {this.updateQuery}/>
          )}
            
          />
        ) : (
          <Route exact path='/' render ={() => (
            <BookShelve books ={this.state.books}/>
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
