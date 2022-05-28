import React, { useState, useEffect } from 'react'
import Bookshelf from './Bookshelf'
import { Link } from "react-router-dom"
import * as BooksAPI from '../utils/BooksAPI'

function BooksApp() {
    const [booksByShelf, setBooksByShelf] = useState({})

    const filterBooksByShelf = (books) => {
        const filteredBooks = {}
        books.forEach((book) => {
            if (Object.keys(filteredBooks).includes(book.shelf)) {
                filteredBooks[book.shelf].push(book)
            } else {
                filteredBooks[book.shelf] = [book]
            }
        })
        return filteredBooks
    }

    const updateShelf = async (book, shelf) => {
        if (shelf !== 'none') {
            await BooksAPI.update(book, shelf)
        }
    }

    useEffect(() => {
        const getAllBooks = async () => {
            const books = await BooksAPI.getAll()
            const filteredBooks = filterBooksByShelf(books)
            setBooksByShelf(filteredBooks)
        }
        getAllBooks()
    }, [updateShelf]);



    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {
                        Object.keys(booksByShelf).map((name, index) =>
                            <Bookshelf shelfName={name}
                                books={booksByShelf[name]}
                                key={index}
                                updateShelf={updateShelf}
                            />
                        )
                    }
                </div>
            </div>
            <div className="open-search">
                <Link to="/search-books">Add a book</Link>
            </div>
        </div>
    )
}

export default BooksApp
