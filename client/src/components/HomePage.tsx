import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const HomePage = () => {
  // albumOfTheDay = initially set to null
  // setAlbumOfTheDay = function used to update albumOfTheDay
  // albumOfTheDay can be any type
  const [albumOfTheDay, setAlbumOfTheDay] = useState<any>(null);
  // errorMessage = initially set to null if there is one
  // setErrorMessage = function used to update errorMessage
  // errorMessage can be a string or null
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // date formatting
  const today = moment().format('dddd, MMMM D, YYYY');

  useEffect(() => {
    // get request to endpoint
    axios.get('/api/album-of-the-day')
      .then(response => {
        // if there is data
        if (response.data) {
          // set albumOfTheDay with the data
          setAlbumOfTheDay(response.data);
          // if there isn't any data
        } else {
          // set the error message
          setErrorMessage('No album of the day set for today. Search for an album and set it as your album of the day!');
        }
      })
      .catch(error => {
        console.error('Error fetching album of the day', error);
        setErrorMessage('Error fetching album of the day');
      });
  }, []);

  const deleteAlbumOfTheDay = (id: number) => {
    // delete request to endpoint
    axios.delete(`/api/album-of-the-day/${id}`)
      .then(() => {
        // once deleted, set albumOfTheDay as null
        setAlbumOfTheDay(null);
        // set the error message
        setErrorMessage('Album of the day has been deleted.');
      })
      .catch(error => {
        console.error('Error deleting album of the day', error);
        setErrorMessage('Error deleting album of the day');
      });
  };

  useEffect(() => {
    console.log(albumOfTheDay);
  }, [albumOfTheDay]); // Log only when albumOfTheDay changes

  return (
    <div className="home-page">
      <h1>Welcome to Just Vibe!</h1>
      <p>{today}</p>
      <h2>Your Album of The Day</h2>
      {albumOfTheDay ? (
        <div>
          <img src={albumOfTheDay.album.imageUrl} />
          <h3>{albumOfTheDay.album.albumName}</h3>
          <p>{albumOfTheDay.album.artistName}</p>
          <button onClick={() => deleteAlbumOfTheDay(albumOfTheDay.id)}>Delete</button>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default HomePage;
