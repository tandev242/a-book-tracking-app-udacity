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

    useEffect(() => {
        const getBooksSearched = async () => {
            const books = await BooksAPI.search(key, 20)
            if (books && !books.error) {
                setBooks(books)
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
                        books.map(book => <li key={book.id}>
                            <BookCard
                                book={book}
                                updateShelf={updateShelf}
                            />
                        </li>)
                    }
                </ol>
            </div>
        </div>
    )
}

export default SearchBooks