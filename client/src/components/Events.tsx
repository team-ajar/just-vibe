// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';



// interface Event {
//   location: string;
//   venue: string;
 
// }



// const Events = () => {
//   // get query from the url using useParams
//   const { query } = useParams();
//   // useState used to declare events and setEvents
//   // events initialized to object w artists and albums as keys and empty arrays as values
//   const [searchResults, setSearchResults] = useState<SearchResultsData>({ events: [] });    events: [],

//   });

//   useEffect(() => {
//     // get data from /api/search/${query}
//     fetch(`/api/search/${query}`)
//       // convert response to data
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('fetched data:', data);
//         // update searchResults with the fetched data using setSearchResults
//         setEvents({
//           location: data,
//           venue: data,
//         });
//       })
//       .catch((error) => console.error("Error fetching search results:", error));
//   }, [query]);

//   console.log("events:", events);

//   return (
//     <div>
//       <h1>Search Results for {query}</h1>
//       <h2>Events</h2>
//       <ul>
//         {/* map over searchResults.albums to make a list item of each album */}
//         {searchResults.events.map((event: Event) => (
//           <li key={event.venue}>{event.venue} {event.location}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Events;
