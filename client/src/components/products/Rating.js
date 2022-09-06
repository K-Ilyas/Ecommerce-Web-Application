import React from 'react'
import StarRatings from 'react-star-ratings';


export default function Rating(props) {

    const { rating, numReviews } = props;

    return (
        <React.Fragment>
            <StarRatings
                rating={parseFloat(rating)}
                starDimension="24px"
                starSpacing="1px"
                starRatedColor="gold" />
            <br />
            <span>Basé sur {numReviews} avis</span>
        </React.Fragment>
    )
}
