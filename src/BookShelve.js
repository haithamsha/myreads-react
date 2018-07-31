import React, {Component} from 'react'
import Book from './Book'

class BookShelve extends Component {

  sendSelfChange(book, shelf) {
    this.props.updateBookShelf(book,shelf);
  }


    render() {
        return (
            <div>
                {this.props.loading && (<div className='pupup' >Loading...............</div>)}
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                  <ol className="books-grid" >
                      {this.props.books
                      .map((b) => (
                        <Book key={b.id} book={b}
                        sendSelfChange={(book,shelf) => {this.sendSelfChange(book,shelf)}}
                        />
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