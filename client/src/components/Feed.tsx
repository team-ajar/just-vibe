import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Reactions from "./Reactions";

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
}

interface Album {
  id: number;
  albumName: string;
  artistName: string;
  image: string;
}

interface Review {
  username: ReactNode;
  Album: Album;
  id: number;
  text: string;
  rating: number;
  userId: number;
  albumId: number;
}

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
}

interface Album {
  id: number;
  albumName: string;
  artistName: string;
  image: string;
}

interface Review {
  username: ReactNode;
  Album: Album;
  id: number;
  text: string;
  rating: number;
  userId: number;
  albumId: number;
}

const Feed = () => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState<User>({id: 0, googleId: '', location: '', name: '', username: '' });
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadUser = () => {
    axios.get('/api/user')
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch(err => console.error(err));
  };

  const loadReviews = (userId: number) => {
    axios.get(`/api/feed/reviews/${userId}`)
      .then((response: any) => {
        setReviews(response.data);
      })
      .catch(err => console.error(err));
  };

  const handleChange = (e: any) => {
    setQuery(e);
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user.id !== 0) {
      loadReviews(user.id);
    }
  }, [user]);

  return (
    <div>
      <h1>Feed</h1>
      <div>
        <input
        type='text'
        placeholder='Search for a user by username'
        onChange={(e) => handleChange(e.target.value)}
        />
        <Link to={`/search/users/${query}`}>Search Users</Link>
      </div>
      <div>
        <h2>Reviews From People You Follow</h2>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id}>
              {review.Album ? (
                <>
                  <h3>{review.Album.albumName} by {review.Album.artistName}</h3>
                  <img src={review.Album.image} alt={review.Album.albumName} />
                </>
              ) : (
                <p>No album information available</p>
              )}
              <p>@{review.username}: {review.text}</p>
              <Reactions userId={user.id} postId={review.id} />
            </div>
          ))
        ) : (
          <p>No reviews to display</p>
        )}
      </div>
    </div>
  )
};

export default Feed;
