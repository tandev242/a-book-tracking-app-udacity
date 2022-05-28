import React, { useState, useEffect } from 'react'
import Bookshelf from './Bookshelf'
import { Link } from "react-router-dom"
import * as BooksAPI from '../utils/BooksAPI'

function BooksApp() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const getAllBooks = async () => {
            const books = await BooksAPI.getAll()
            setBooks(books)
        }
        getAllBooks()
    }, []);

    const updateShelf = async (book, shelf) => {
        book.shelf = shelf
        await BooksAPI.update(book, shelf)
        setBooks([...books.filter(b => b.id !== book.id), book])
    }

    const categorizeBooksByShelf = (books) => {
        const categorizedBooks = {}
        books.forEach((book) => {
            if (Object.keys(categorizedBooks).includes(book.shelf)) {
                categorizedBooks[book.shelf].push(book)
            } else {
                categorizedBooks[book.shelf] = [book]
            }
        })
        return (
            <div>
                {
                    Object.keys(categorizedBooks).map((name, index) =>
                        <Bookshelf shelfName={name}
                            books={categorizedBooks[name]}
                            key={index}
                            updateShelf={updateShelf}
                        />
                    )
                }
            </div>)
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {categorizeBooksByShelf(books)}
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export default BooksApp
