import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// define interfaces for Artist, Album, and SearchResultsData
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
}

interface SearchResultsData {
  artists: Artist[];
  albums: Album[];
}

const SearchResults = () => {
  // get query from the url using useParams
  const { query } = useParams();
  // useState used to declare searchResults and setSearchResults
  // searchResults initialized to object w artists and albums as keys and empty arrays as values
  const [searchResults, setSearchResults] = useState<SearchResultsData>({ artists: [], albums: [] });

  useEffect(() => {
    // get data from /api/search/${query}
    fetch(`/api/search/${query}`)
      // convert response to data
      .then(response => response.json())
      .then((data) => {
        // console.log('fetched data:', data);
        // update searchResults with the fetched data using setSearchResults
        setSearchResults({
          artists: data.artists.artist,
          albums: data.albums.album
        });
      })
      .catch(error => console.error('Error fetching search results:', error));
  }, [query]);

  console.log('searchResults:', searchResults);

  return (
    <div>
      <h1>Search Results for {query}</h1>
      <h2>Albums</h2>
        <ul>
          {/* map over searchResults.albums to make a list item of each album */}
          {searchResults.albums.map((album: Album) => (
            <li key={album.name}>
                <a href={album.url}>
                  {album.image[0] && <img src={album.image[0]['#text']} />}
                  {album.name}
              </a>
            </li>
          ))}
        </ul>
      <h2>Artists</h2>
        <ul>
          {/* map over searchResults.artists to make a list item of each artist */}
          {searchResults.artists.map((artist: Artist) => (
            <li key={artist.name}>
              <a href={artist.url}>
                {artist.image[0] && <img src={artist.image[0]['#text']} />}
                {artist.name}
              </a>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default SearchResults;
