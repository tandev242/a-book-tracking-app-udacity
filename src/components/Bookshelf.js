import React from 'react'
import BookCard from './BookCard'
import { standardizeName } from '../utils/validator'
import PropTypes from 'prop-types'
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

Bookshelf.propTypes = {
    shelfName: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
}

export default Bookshelf
