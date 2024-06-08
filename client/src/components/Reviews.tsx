import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, Link } from 'react-router-dom';

interface Review {
  text: string;
  rating: number;
  userId: number;
  id: number;
}



const Reviews = () => {
  const { albumId } = useParams<{ albumId: string }>();
  //const location = useLocation();
  //destruct the state from the Link in search results
  const { state } = useLocation();
  console.log('LOCATION STATE HERE', state);
 

  const [review, setReview] = useState<Review>({ text: "", rating: 5, userId: 1, id: 1 });
  const [reviews, setReviews] = useState<Review[]>([]);

  const createReview = () => {
    console.log("ALBUM ID CHECKSSSSS:", review);
    //end point and the body being sent
    axios.post(`/api/albums/${review.albumId}/review/${review.userId}`, review)
      .then(response => {
        console.log('RESPONSE HERE', response.data)
        setReviews(response.data);
        setReview({ text: "", rating: 5, userId: 1, id: 1 });
      })
      .catch(error => {
        console.error('Error creating review:', error);
      });
  };

  const deleteReview = (albumId: string, id: string) => {
    axios.delete(`/api/albums/${albumId}/review/${id}`)
      .then(() => {
        setReviews(reviews.filter(review => review.id !== id));
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  };

  const updateReview = () => {
    axios.put(`/api/albums/${review.albumId}/review/${review.id}`, review)
      .then(response => {
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
        {state.name}
        <br />
        <img src={state.image[2]["#text"]} />
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
        {reviews.length ? (
          reviews.map((rev) => (
            <div key={rev.id}>
              <p>{rev.text}</p>
              <button onClick={() => deleteReview(rev.albumId, rev.id)}>Delete</button>
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