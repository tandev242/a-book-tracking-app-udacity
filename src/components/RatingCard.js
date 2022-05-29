import React from 'react'
import { Rating } from 'react-simple-star-rating'
import PropTypes from 'prop-types'

function RatingCard(props) {
    const { book } = props

    return (
        <div>
            <Rating
                initialValue={book.averageRating || 0}
                size={50}
                label
                readonly
                fillColor='orange'
                emptyColor='gray'
            />

            {
                book.ratingsCount ?
                    `${book.ratingsCount} reviews`
                    :
                    "No reviews"
            }
        </div>
    )
}

RatingCard.propTypes = {
    book: PropTypes.object.isRequired,
}

export default RatingCard
