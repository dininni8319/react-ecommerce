import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (prod) => {
  if (prod && prod.ratings) {
     let ratingsArr = prod && prod.ratings;
     let total = [];
     let length = ratingsArr.length;
     
     ratingsArr.map((rat) => total.push(rat.star));
     let totalReduced = total.reduce((prev, next) => prev + next, 0);

     let highest = length * 5;
     let result = (totalReduced * 5) / highest;

     return (
       <div className='text-center pt-1 pb-3'>
          <span>
              <StarRating 
                starDimension='20px'
                starSpacing='2px'
                starRatedColor='orange'
                editing={false}
                rating={result} 
              />
              ({prod.ratings.length})
          </span>
       </div>
     )
  }
}