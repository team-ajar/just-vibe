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
  // isEditing = initially set to false
  // setIsEditing = used to update isEditing
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // newAlbumId = initially set to null
  // setNewAlbumId = used to update newAlbumId
  // newAlbumId can be a number or null
  const [newAlbumId, setNewAlbumId] = useState<number | null>(null);
  // albums = initially set to an empty array
  // setAlbums = used to update albums
  const [albums, setAlbums] = useState<any[]>([]);
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

    // get all saved albums
    axios.get('/api/music/albums')
      .then(response => {
        setAlbums(response.data);
      })
      .catch(error => {
        console.error('Error fetching albums', error);
        setErrorMessage('Error fetching albums');
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

  const editAlbumOfTheDay = (id: number, newAlbumId: number) => {
    // put request to the endpoint
    axios.put(`/api/album-of-the-day/${id}`, { id, albumId: newAlbumId, userId: albumOfTheDay.user.id })
      .then(() => {
        // after successful update, get the updated album of the day
        axios.get('/api/album-of-the-day')
          .then(response => {
            if (response.data) {
              // set album of the day to the response data
              setAlbumOfTheDay(response.data);
              // set isEditing to false
              setIsEditing(false);
              // set the Error message
              setErrorMessage('Album of the day has been updated.');
            } else {
              setErrorMessage('Error fetching updated album of the day');
            }
          })
          .catch(error => {
            console.error('Error fetching updated album of the day', error);
            setErrorMessage('Error fetching updated album of the day');
          });
      })
      .catch(error => {
        console.error('Error editing album of the day', error);
        setErrorMessage('Error editing album of the day');
      });
  };


  return (
    <div className="home-page">
      <h1>Welcome to Just Vibe!</h1>
      <p>{today}</p>
      <h2>Your Album of The Day</h2>
      {albumOfTheDay ? (
        <div>
          <img src={albumOfTheDay.album.image} />
          <h3>{albumOfTheDay.album.albumName}</h3>
          <p>{albumOfTheDay.album.artistName}</p>
          <button onClick={() => deleteAlbumOfTheDay(albumOfTheDay.id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          {isEditing && (
            <div>
              <select onChange={(e) => setNewAlbumId(Number(e.target.value))} value={newAlbumId || ''}>
                <option value="" disabled>Select an album</option>
                {albums.map(album => (
                  <option key={album.id} value={album.id}>
                    {album.albumName} by {album.artistName}
                  </option>
                ))}
              </select>
              <button onClick={() => newAlbumId && editAlbumOfTheDay(albumOfTheDay.id, newAlbumId)}>Save</button>
            </div>
          )}
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default HomePage;
