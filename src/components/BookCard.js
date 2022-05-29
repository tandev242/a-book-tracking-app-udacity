import React from 'react'
import { standardizeName } from '../utils/validator'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

function BookCard(props) {
    const { book, updateShelf } = props
    const options = ['currentlyReading', 'wantToRead', 'read', 'none']

    return (
        <div className="book">
            <div className="book-top">
                <Link to={`/book/${book.id}`}>
                    <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ""})` }}></div>
                </Link>
                <div className="book-shelf-changer">
                    <select defaultValue={book.shelf || "none"} onChange={(e) => updateShelf(book, e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        {
                            options.map((option, index) =>
                                <option value={option} key={index}>{standardizeName(option)}</option>
                            )
                        }
                    </select>
                </div>
            </div>
            <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className="book-title">{book.title}</div>
            </Link>
            {
                book.authors && book.authors.map((author, index) =>
                    <div className="book-authors" key={index}>
                        {author}
                    </div>
                )
            }
        </div>
    )
}

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired,
}

export default BookCard
