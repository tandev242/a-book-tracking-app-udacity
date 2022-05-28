import React, { useState, useEffect } from 'react'
import { useRouteMatch } from "react-router-dom"
import * as BooksAPI from '../utils/BooksAPI'

function BookDetails() {
    const [book, setBook] = useState(null)
    const match = useRouteMatch()
    useEffect(() => {
        const { id } = match.params
        const getBookById = async (id) => {
            const book = await BooksAPI.get(id)
            setBook(book)
        }
        getBookById(id)
    }, [])

    if (!book) {
        return null
    }

    return (
        <div className="book-details">
            <div className="book-details-top">
                <div className="book-details-cover" style={{ backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ""})` }}></div>
            </div>
            <div className="book-details-title">{book.title}</div>
            {
                book.authors && book.authors.map((author, index) =>
                    <div className="book-authors" key={index}>{author}
                    </div>
                )
            }
            <div className="book-details-description"> <h3>Description:</h3> {book.description}</div>
        </div>
    )
}

export default BookDetails
