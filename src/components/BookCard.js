import React from 'react'
import { standardizeName } from '../utils/validator'
import { Link } from "react-router-dom"

function BookCard(props) {
    const { book, updateShelf } = props
    const options = ['currentlyReading', 'wantToRead', 'read']

    return (
        <div className="book">
            <div className="book-top">
                <Link to={`/book-details/${book.id}`}>
                    <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                </Link>
                {
                    updateShelf && (<div className="book-shelf-changer">
                        <select defaultValue={book.shelf} onChange={(e) => updateShelf(book, e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            {
                                options.map((option, index) =>
                                    <option value={option} key={index}>{standardizeName(option)}</option>
                                )
                            }
                            <option value="none">None</option>
                        </select>
                    </div>)
                }

            </div>
            <div className="book-title">{book.title}</div>
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

export default BookCard
