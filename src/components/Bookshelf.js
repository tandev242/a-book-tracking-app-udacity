import React from 'react'
import BookCard from './BookCard'
import { standardizeName } from '../utils/validator'

function Bookshelf(props) {
    const { shelfName, books, updateShelf } = props

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{standardizeName(shelfName)}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map(book => <li key={book.id}>
                            <BookCard
                                book={book}
                                updateShelf={updateShelf}
                            />
                        </li>
                        )
                    }
                </ol>
            </div>
        </div>
    )
}

export default Bookshelf
