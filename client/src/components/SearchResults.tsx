import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

interface Artist {
  image: any;
  name: string;
  url: string;
};

interface Album {
  id: number;
  image: any;
  name: string;
  artist: string;
  url: string;
};

interface SearchResultsData {
  artists: Artist[];
  albums: Album[];
};

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState<SearchResultsData>({ artists: [], albums: [] });
  const [albumOfTheDaySet, setAlbumOfTheDaySet] = useState<boolean>(false);

  const saveAlbum  = (album: any) => {
     axios.post('/api/music/album', {
       albumName: album.name,
      artistName: album.artist,
      image: album.image[3]['#text'],
     })
       .catch(err => console.error(err));
  }

  const saveArtist = (artist: Artist) => {
    axios.post('/api/music/artist', {
      artistName: artist.name
    })
      .catch(err => console.error(err));
  };

  const saveAlbumOfTheDay = (album: any) => {
    if (albumOfTheDaySet) {
      alert('You have already set an album of the day for today.');
      return;
    }

    const { name: albumName, artist: artistName} = album;

    axios.post('/api/album-id', { albumName, artistName })
      .then((response) => {
        const albumId = response.data.albumId;

        axios.get('/api/user')
          .then((profileResponse) => {
            const userId = profileResponse.data.id;

            axios.post('/api/album-of-the-day', { albumId, userId })
              .then(() => {
                setAlbumOfTheDaySet(true);
              })
              .catch(err => console.error('Error setting album of the day', err));
          })
          .catch(err => console.error('Error getting userId', err));
      })
      .catch(err => console.error('Error getting albumId', err));
  };

  useEffect(() => {
    fetch(`/api/search/${query}`)
      .then(response => response.json())
      .then((data) => {
        setSearchResults({
          artists: data.artists.artist,
          albums: data.albums.album
        });
      })
      .catch(error => console.error('Error fetching search results:', error));

      axios.get('/api/album-of-the-day')
        .then((response) => {
          if (response.data && dayjs(response.data.date).isSame(dayjs(), 'day')) {
            setAlbumOfTheDaySet(true);
          }
        })
        .catch(err => console.error('Error checking album of the day', err));
  }, [query]);

  return (
    <div>
      <h1>Search Results for {query}</h1>
      <h2>Albums</h2>
        <ul>
          {searchResults.albums.map((album: Album) => (
            <li key={album.name}>
                <a href={album.url}>
                  {album.image[1] && <img src={album.image[1]['#text']} />}
                  {album.name}
              </a>
              <button onClick={() => saveAlbum(album)}>Save Album</button>
              <button onClick={() => saveAlbumOfTheDay(album)} disabled={albumOfTheDaySet}>Set as Album of the Day</button>
              <Link to={{
              pathname:`/reviews`,
              }}
              state = {album}>
              <button>Write Review</button>
            </Link>
            </li>
          ))}
        </ul>
      <h2>Artists</h2>
      <ul>
        {searchResults.artists.map((artist: Artist) => (
          <li key={artist.name}>
            <a href={artist.url}>
              {artist.name}
            </a>
            <button onClick={() => saveArtist(artist)}>Save Artist</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
