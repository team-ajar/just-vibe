import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';

const HomePage = () => {
  const [albumOfTheDay, setAlbumOfTheDay] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newAlbumId, setNewAlbumId] = useState<number | null>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const today = dayjs().format('dddd, MMMM D, YYYY');

  useEffect(() => {
    axios.get('/api/album-of-the-day')
      .then(response => {
        if (response.data) {
          setAlbumOfTheDay(response.data);
        } else {
          setErrorMessage('No album of the day set for today. Search for an album and set it as your album of the day!');
        }
      })
      .catch(error => {
        console.error('Error fetching album of the day', error);
        setErrorMessage('Error fetching album of the day');
      });

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
    axios.delete(`/api/album-of-the-day/${id}`)
      .then(() => {
        setAlbumOfTheDay(null);
        setErrorMessage('Album of the day has been deleted.');
      })
      .catch(error => {
        console.error('Error deleting album of the day', error);
        setErrorMessage('Error deleting album of the day');
      });
  };

  const editAlbumOfTheDay = (id: number, newAlbumId: number) => {
    axios.put(`/api/album-of-the-day/${id}`, { id, albumId: newAlbumId, userId: albumOfTheDay.user.id })
      .then(() => {
        axios.get('/api/album-of-the-day')
          .then(response => {
            if (response.data) {
              setAlbumOfTheDay(response.data);
              setIsEditing(false);
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
