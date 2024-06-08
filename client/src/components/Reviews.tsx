import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import axios from 'axios';

interface Review {
  albumId: string;
  text: string;
  rating: string;
  userId: string;
  id: string;
}

const Reviews = () => {
  // State hook to store the created review information
  const [review, setReview] = useState<Review>({ albumId: '1', text: '', rating: '5', userId: '1', id: '' });
  // State hook to store ALL created reviews
  const [reviews, setReviews] = useState<Review[]>([]);

  const createReview = () => {
    // Log review data for debugging
    console.log("Creating review with data:", review); // 
    axios.post(`/albums/${review.albumId}/review`, review)
      .then(response => {
        setReviews(response.data);
        setReview({ albumId: '1', text: '', rating: '5', userId: '', id: '' }); // Reset review form
      })
      .catch(error => {
        console.error('Error creating review:', error);
      });
  };

  const deleteReview = (albumId: string, id: string) => {
    axios.delete(`/albums/${albumId}/review/${id}`)
      .then(() => {
        setReviews(reviews.filter(review => review.id !== id));
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  };

  const updateReview = () => {
    //put post endpoint from index.ts , varied with each album
    axios.put(`/albums/${review.albumId}/review/${review.id}`, review)
      .then(response => {
        //use map to update the response long as the id matches the chosen review
        setReviews(reviews.map(existingReview => existingReview.id === review.id ? response.data : existingReview));
      })
      .catch(error => {
        console.error('Error updating review:', error);
      });
  };

  return (
    <div>
      <div>
        <h1>Reviews</h1>
      </div>
      <div>
        <label>What did you think of the album?</label>
      </div>
      <div>
        <textarea
          maxLength={18800}
          placeholder='Write review here'
          rows={6}
          value={review.text}
          onChange={(e) => setReview({ ...review, text: e.target.value })}
        ></textarea>
      </div>
      <div>
        <button onClick={createReview}>Submit Review</button>
      </div>
      <div>
        <h2>All Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id}>
              <p>{rev.text}</p>
              <button onClick={() => deleteReview(rev.albumId, rev.id)}>Delete</button>
              <button onClick={() => updateReview()}>Update</button>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;