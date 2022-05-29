import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import BookCard from './BookCard'
import * as BooksAPI from '../utils/BooksAPI'
import useDebounce from '../utils/useDebounce'

function SearchBooks() {
    const [key, setKey] = useState("")
    const [books, setBooks] = useState([])
    const debouncedKey = useDebounce(key, 500)
    const history = useHistory()
    const goBack = () => {
        history.goBack()
    }

    const addShelfToBook = (book, myBooks) => {
        myBooks.forEach(b => {
            if (b.id === book.id) {
                book.shelf = b.shelf
            }
        })
        return book
    }

    useEffect(() => {
        const getBooksSearched = async () => {
            const foundBooks = await BooksAPI.search(key, 20)
            if (foundBooks && !foundBooks.error) {
                const myBooks = await BooksAPI.getAll()
                // Search api return value has no 'shelf' field so we need to check it with our books and add it to book
                const mergedBooks = foundBooks.map(book => addShelfToBook(book, myBooks))
                setBooks(mergedBooks)
            } else {
                setBooks([])
            }
        }
        getBooksSearched()
    }, [debouncedKey])

    const updateShelf = async (book, shelf) => {
        await BooksAPI.update(book, shelf)
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a className="close-search" onClick={goBack}>Close</a>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={(e) => setKey(e.target.value)} />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        key ?
                            (
                                books.length > 0 ? books.map(book =>
                                    <li key={book.id}>
                                        <BookCard
                                            book={book}
                                            updateShelf={updateShelf}
                                        />
                                    </li>)
                                    :
                                    <h1>Can't find the book you're looking for !</h1>
                            )
                            :
                            <h1>Please enter a keyword to search !</h1>
                    }
                </ol>
            </div>
        </div>
    )
}

export default SearchBooks