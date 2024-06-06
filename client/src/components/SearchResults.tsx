import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Artist {
  name: string;
  url: string;
}

interface Album {
  name: string;
  artist: string;
  url: string;
}

interface SearchResultsData {
  artists: Artist[];
  albums: Album[];
}

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState<SearchResultsData>({ artists: [], albums: [] });

  useEffect(() => {
    fetch(`/api/search/${query}`)
      .then(response => response.json())
      .then((data) => {
        // console.log('fetched data:', data);
        setSearchResults({
          artists: data.artists.artist,
          albums: data.albums.album
        });
      })
      .catch(error => console.error('Error fetching search results:', error));
  }, [query]);

  // console.log('searchResults:', searchResults);

  return (
    <div>
      <h1>Search Results for {query}</h1>
      <h2>Artists</h2>
        <ul>
          {searchResults.artists.map((artist: Artist) => (
            <li key={artist.name}>
              <a href={artist.url}>{artist.name}</a>
            </li>
          ))}
        </ul>
      <h2>Albums</h2>
        <ul>
          {searchResults.albums.map((album: Album) => (
            <li key={album.name}>
              <a href={album.url}>{album.name}</a>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default SearchResults;
