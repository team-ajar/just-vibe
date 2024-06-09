import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Define interfaces for Artist, Album, and SearchResultsData
interface Artist {
  image: any;
  name: string;
  url: string;
}

interface Album {
  image: any;
  name: string;
  artist: string;
  url: string;
  id: string; // Assume that each album has a unique id
}

interface SearchResultsData {
  artists: Artist[];
  albums: Album[];
}

const SearchResults = () => {
  // Get query from the URL using useParams
  const { query } = useParams();
  // useState used to declare searchResults and setSearchResults
  // searchResults initialized to an object with artists and albums as keys and empty arrays as values
  const [searchResults, setSearchResults] = useState<SearchResultsData>({ artists: [], albums: [] });

  const saveAlbum = (album: Album) => {
    axios.post('/api/music/album', {
      albumName: album.name,
      artistName: album.artist,
    })
      .then(data => console.log('Album saved:', data))
      .catch(err => console.error(err));
  }

  const saveArtist = (artist: Artist) => {
    axios.post('/api/music/artist', {
      artistName: artist.name
    })
      .then(data => console.log('Artist saved:', data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    // Get data from /api/search/${query}
    fetch(`/api/search/${query}`)
      .then(response => response.json())
      .then((data) => {
        // Update searchResults with the fetched data using setSearchResults
        setSearchResults({
          artists: data.artists.artist,
          albums: data.albums.album
        });
      })
      .catch(error => console.error('Error fetching search results:', error));
  }, [query]);
  //save the album.id to the Reviews
  //pass the album info to the Reviews
  return (
    <div>
      <h1>Search Results for {query}</h1>
      <h2>Albums</h2>
      <ul>
        {/* Map over searchResults.albums to make a list item of each album */}
        {searchResults.albums.map((album: Album) => (
          <li key={album.id}>
            <a href={album.url}>
              {album.image[1] && <img src={album.image[1]['#text']} alt={album.name} />}
              {album.name}
            </a>
            <button onClick={() => saveAlbum(album)}>Save Album</button>
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
        {/* Map over searchResults.artists to make a list item of each artist */}
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