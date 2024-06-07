import React, { useState } from 'react';
import axios from "axios";

const Reviews = () => {

  //create a state hook that will store the created review information
  const [review, reviewContent] = useState({ albumId: '', text: '', rating: '', userId: '', id: '' })
  //create a state hook to store ALL created reviews
  const [reviews, setReviews] = useState([]);

  const createReview = () => {
    // const { albumId, text, rating, userId, id} = reviewContent;
    // axios.post(`/albums/${albumId}/review`)
  };

  const deleteReview = () => {

  };

  const updateReview = () => {

  };

  return (
    <div>
      <h1>Reviews</h1>
    </div>  
  )
}

export default Reviews;