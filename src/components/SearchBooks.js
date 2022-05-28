import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import BookCard from './BookCard'
import * as BooksAPI from '../utils/BooksAPI'

function SearchBooks() {
    const [text, setText] = useState("")
    const [books, setBooks] = useState([])
    const history = useHistory()
    const goBack = () => {
        history.goBack()
    }

    useEffect(() => {
        const getBooksSearched = async () => {
            const books = await BooksAPI.search(text, 20)
            if (books && !books.error) {
                setBooks(books)
            } else {
                setBooks([])
            }
        }
        getBooksSearched()
    }, [text])

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a className="close-search" onClick={goBack}>Close</a>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={(e) => setText(e.target.value)} />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        books.map(book => <BookCard
                            book={book}
                            key={book.id}
                        />)
                    }
                </ol>
            </div>
        </div>
    )
}

export default SearchBooks