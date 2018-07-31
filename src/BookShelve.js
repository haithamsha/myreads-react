import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

class BookShelve extends Component {
    render() {
        return (
            <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                  <ol className="books-grid" >
                      {this.props.books.filter((b) => b.shelf === this.props.shelf)
                      .map((b) => (
                        <Book key = {b.id} book = {b} />
                      ))
                      }
                  </ol>
                  </div>
                </div>
            </div>
        )
    }
}


export default BookShelve;