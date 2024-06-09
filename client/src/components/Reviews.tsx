import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

interface Review {
  text: string;
  rating: number;
  userId: number;
  id: number;
}

const Reviews = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { state } = useLocation();
 
  const [review, setReview] = useState<Review>({ text: "", rating: 5, userId: 1, id: 0 });
  const [reviews, setReviews] = useState<Review[]>([]);

  const showReviews = () => {
    axios.get(`/api/albums/${state.name + state.artist}/reviews`)
      .then(response => {
        console.log(response.data);
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error retrieving reviews:', error);
      });
  };

  const createReview = () => {
    axios.post(`/api/albums/${state.name + state.artist}/review/${review.userId}`, review)
      .then(response => {
        console.log('RESPONSE HERE', response.data);
        setReviews(prev => [...prev, response.data]);
        setReview({ text: "", rating: 5, userId: 1, id: 0 }); // Resetting id to 0 to prepare for the next new review
      })
      .catch(error => {
        console.error('Error creating review:', error);
      });
  };

  const deleteReview = (albumId: string, reviewId: number, userId: number) => {
    axios.delete(`/api/albums/${albumId}/review/${reviewId}/${userId}`)
      .then(() => {
        setReviews(reviews.filter(review => review.id !== reviewId));
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  };

  const updateReview = () => {
    axios.put(`/api/albums/${state.name + state.artist}/review/${review.id}/${review.userId}`, review)
      .then(response => {
        setReviews(reviews.map(existingReview => existingReview.id === review.id ? response.data : existingReview));
        setReview({ text: "", rating: 5, userId: 1, id: 0 }); // Resetting form after update
      })
      .catch(error => {
        console.error('Error updating review:', error);
      });
  };

  useEffect(() => {
    if (!state) return;
    showReviews();
  }, [state]);

  return (
    <div>
      <div>
        <h1>Reviews</h1>
        {state.name}
        <br />
        <img src={state.image[2]["#text"]} alt={`${state.name} album cover`} />
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
        {review.id !== 0 && <button onClick={updateReview}>Update Review</button>}
      </div>
      <div>
        <h2>All Reviews</h2>
        {reviews.length ? (
          reviews.map((rev) => (
            <div key={rev.id}>
              <p>{rev.text}</p>
              <button onClick={() => deleteReview(state.name + state.artist, rev.id, rev.userId)}>Delete</button>
              <button onClick={() => setReview(rev)}>Update</button>
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