// @ts-nocheck
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class SearchPage extends Component {
  state = {
    query: '',
    library: []
  }
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }
  handleChange = (event, book) => {
    const shelf = event.target.value
    if (this.props.onChangeShelf) {
      this.props.onChangeShelf(book, shelf)
    }
  }
  handleInputChange = event => {
    event.preventDefault()
    const query = event.target.value
    this.setState({ query })
    const { books } = this.props
    query.length > 0 &&
      BooksAPI.search(query, 20).then(libraryBooks => {
        const originalBookIds = books.map(book => book.id)
        const libraryBookIds = libraryBooks.length > 0 && libraryBooks.map(book => book.id)
        let commonBookIds = [],
          newBookIds = [],
          commonBooks = [],
          newBooks = []
        for (let i = 0; i < libraryBookIds.length; i++) {
          let item = libraryBookIds[i]
          if (originalBookIds.includes(item)) {
            commonBookIds.push(item)
          } else {
            newBookIds.push(item)
          }
        }
        commonBookIds.forEach(id => {
          commonBooks.push(books.find(book => book.id === id))
        })
        newBookIds.forEach(id => {
          newBooks.push(libraryBooks.find(book => book.id === id))
        })
        this.setState({ library: newBooks.concat(commonBooks) })
      })
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
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {library.length > 0 &&
              library.map(
                (book, index) =>
                  book.imageLinks &&
                  <li key={index}>
                    <Book book={book} handleChange={this.handleChange} />
                  </li>
              )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
