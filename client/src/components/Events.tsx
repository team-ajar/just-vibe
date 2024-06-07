import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// define interfaces for Artist, Album, and SearchResultsData
interface Favorite {
  image: any;
  name: string;
  url: string;
}

interface Local {
  image: any;
  name: string;
  artist: string;
  url: string;
}

interface EventsData {
  favorites: Favorite[];
  locals: Local[];
}

const Events = () => {
  // get query from the url using useParams
  const { query } = useParams();
  // useState used to declare events and setEvents
  // events initialized to object w artists and albums as keys and empty arrays as values
  const [events, setEvents] = useState<EventsData>({
    favorites: [],
    locals: [],
  });

  useEffect(() => {
    // get data from /api/search/${query}
    fetch(`/api/search/${query}`)
      // convert response to data
      .then((response) => response.json())
      .then((data) => {
        // console.log('fetched data:', data);
        // update searchResults with the fetched data using setSearchResults
        setEvents({
          favorite: data.favorites.favorite,
          local: data.locals.local,
        });
      })
      .catch((error) => console.error("Error fetching search results:", error));
  }, [query]);

  console.log("events:", events);

  return (
    <div>
      <h1>Search Results for {query}</h1>
      <h2>Favorites</h2>
      <ul>
        {/* map over searchResults.albums to make a list item of each album */}
        {events.favorites.map((favorite: Favorite) => (
          <li key={favorite.name}>
            <a href={favorite.url}>{favorite.name}</a>
          </li>
        ))}
      </ul>
      <h2>Local Events</h2>
      <ul>
        {/* map over events.locals to make a list item of each artist */}
        {events.locals.map((local: Local) => (
          <li key={local.name}>
            <a href={local.url}>{local.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
