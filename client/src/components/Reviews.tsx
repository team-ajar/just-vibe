import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface Review {
  text: string;
  rating: number;
  userId: number;
  id: number;
}

const Reviews = () => {
  const { state } = useLocation();

  const [userId, setUserId] = useState<null | number>(null)
  const [review, setReview] = useState<{text: string, rating: number, id?: number}>({ text: "", rating: 5, id: undefined });
  const [reviews, setReviews] = useState<Review[]>([]);

  const showReviews = () => {
    axios.get(`/api/albums/${state.artist}/${state.name}/reviews`)
      .then(response => {
        if (response.data.error){
          alert("Save album!")
          return
        }
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error retrieving reviews:', error);
      });
  };

  const createReview = () => {
    if (!userId){
      return
    }
    axios.post(`/api/albums/${state.artist}/${state.name}/review/${userId}`, review)
      .then(response => {
        setReviews(prev => [...prev, response.data]);
        setReview({ text: "", rating: 5 });
      })
      .catch(error => {
        if (error.response.status === 404){
          alert(error.response.data)
        }
        console.error('Error creating review:', error);
      });
  };

  const deleteReview = ( reviewId: number) => {
    if (!userId){
      return
    }
    axios.delete(`/api/albums/review/${reviewId}/${userId}`)
      .then(() => {
        setReviews(reviews.filter(review => review.id !== reviewId));
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  };

  const updateReview = (reviewId?: number) => {
    if (!reviewId || !userId){
      return
    }
    axios.put(`/api/albums/review/${reviewId}/${userId}`, review)
      .then(response => {
        setReviews(reviews.map(existingReview => existingReview.id === reviewId ? response.data : existingReview));
        setReview({ text: "", rating: 5 });
      })
      .catch(error => {
        console.error('Error updating review:', error);
      });
  };

  useEffect(() => {
    if (!state) return;
    showReviews();
    return () => {
      setReviews([])
    }
  }, [state]);

  useEffect(() => {
    axios.get(`api/user`)
    .then((response) => {
      if (response.status === 404){
        return
      }
      setUserId(response.data.id)
    })
  }, [])

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
        {review.id && <button onClick={() => updateReview(review.id)}>Update Review</button>}
      </div>
      <div>
        <h2>All Reviews</h2>
        {reviews.length ? (
          reviews.map((rev) => (
            <div key={rev.id}>
              <p>{rev.text}</p>
              <button onClick={() => deleteReview( rev.id )}>Delete</button>
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
