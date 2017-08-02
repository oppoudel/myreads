// @ts-nocheck
import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchPage from './components/SearchPage'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }
  changeShelf(book, shelf) {
    const updatedBook = { ...book, shelf }
    BooksAPI.update(book, shelf)
    const updatedBooks = this.state.books.filter(b => b.id !== updatedBook.id).concat(updatedBook)
    this.setState({ books: updatedBooks })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={history =>
            <ListBooks
              books={this.state.books}
              onChangeShelf={(value, book) => {
                this.changeShelf(value, book)
              }}
            />}
        />
        <Route
          path="/search"
          render={({ history }) =>
            <SearchPage
              books={this.state.books}
              onChangeShelf={(value, book) => {
                this.changeShelf(value, book)
                history.push('/')
              }}
            />}
        />
      </div>
    )
  }
}

export default BooksApp
