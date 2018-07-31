import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class BookSearch extends Component {
    
    render() {
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to='/' className="close-search" >Close</Link>
                        <div className="search-books-input-wrapper">
                            <input onChange={(event) => { this.props.onClick() }} 
                            type="text" placeholder="Search by title or author" />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid" >
                            {this.props.books
                                .map((b) => (
                                    <li key={b.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{
                                                    width: 128, height: 193
                                                    , backgroundImage: `url(${b.imageLinks.smallThumbnail})`
                                                }}></div>
                                                <div className="book-shelf-changer">
                                                    <select defaultValue={b.shelf}>
                                                        <option value="move" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{b.title}</div>
                                            <div className="book-authors">{b.authors}</div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookSearch;