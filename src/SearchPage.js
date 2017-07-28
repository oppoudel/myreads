// @ts-nocheck
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
  state = {
    query: '',
    library: []
  }

  handleChange = (event, book) => {
    const shelf = event.target.value
    if (this.props.onChangeShelf) {
      this.props.onChangeShelf(book, shelf)
    }
  }
  handleSubmit = event => {
    event.preventDefault()
    BooksAPI.search(this.state.query, 20).then(books => {
      this.setState({ library: books })
    })
  }
  updateQuery = query => {
    this.setState({ query: query.trim() })
  }
  clearQuery = () => {
    this.setState({ query: '' })
  }
  render() {
    const { query, library } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={e => this.updateQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {library.length > 0 &&
              library.map(book =>
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          value={book.shelf}
                          onChange={e => {
                            this.handleChange(e, book)
                          }}
                        >
                          <option value="none" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">
                      {book.title}
                    </div>
                    <div className="book-authors">
                      {book.authors.join(', ')}
                    </div>
                  </div>
                </li>
              )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage