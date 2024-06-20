import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { Container, Typography, Card, CardContent, CardMedia, Button, Select, MenuItem, Box } from "@mui/material";

interface Artist {
  image: any;
  name: string;
  url: string;
}

interface Album {
  id: number;//
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
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState<SearchResultsData>({
    artists: [],
    albums: [],
  });

  const [albumOfTheDaySet, setAlbumOfTheDaySet] = useState<boolean>(false);
  const [user, setUser] = useState({
    id: 0,
    googleId: "",
    location: "",
    name: "",
    username: "",
  });

  const loadUser = () => {
    axios
      .get("/api/user")
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  };

  const saveAlbum = (album: any) => {
    axios
      .post(`/api/music/album/${user.id}`, {
        albumName: album.name,
        artistName: album.artist,
        image: album.image[3]["#text"],
      })
      .catch((err) => console.error(err));
  };

  const saveArtist = (artist: Artist) => {
    axios
      .post(`/api/music/artist/${user.id}`, {
        artistName: artist.name,
      })
      .catch((err) => console.error(err));
  };

  const saveAlbumOfTheDay = (album: any) => {
    if (albumOfTheDaySet) {
      alert("You have already set an album of the day for today.");
      return;
    }

    const { name: albumName, artist: artistName } = album;

    axios
      .post("/api/album-id", { albumName, artistName })
      .then((response) => {
        const albumId = response.data.albumId;

        axios
          .get("/api/user")
          .then((profileResponse) => {
            const userId = profileResponse.data.id;

            axios
              .post("/api/album-of-the-day", { albumId, userId })
              .then(() => {
                setAlbumOfTheDaySet(true);
              })
              .catch((err) =>
                console.error("Error setting album of the day", err)
              );
          })
          .catch((err) => console.error("Error getting userId", err));
      })
      .catch((err) => console.error("Error getting albumId", err));
  };

  useEffect(() => {
    loadUser();
    fetch(`/api/search/${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults({
          artists: data.artists.artist,
          albums: data.albums.album,
        });
      })
      .catch((error) => console.error("Error fetching search results:", error));

    axios
      .get("/api/album-of-the-day")
      .then((response) => {
        if (response.data && dayjs(response.data.date).isSame(dayjs(), "day")) {
          setAlbumOfTheDaySet(true);
        }
      })
      .catch((err) => console.error("Error checking album of the day", err));
  }, [query]);
  return (
    <div>
      <Typography
        variant="h1"
        sx={{
          fontSize: "3rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "#000000", // primary color
          mb: 4, // margin-bottom
        }}
      >
        Search Results for {query}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: "2rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "#000000", // primary color
          mb: 2, // margin-bottom
        }}
      >
        Albums
      </Typography>
      <ul>
        {searchResults.albums.map((album: Album, i: any) => (
          <li key={i}>
            <Card sx={{ display: "flex", mb: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={album.image[3]["#text"]}
                alt={album.name}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {album.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {album.artist}
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => saveAlbum(album)}
                    sx={{ boxShadow: "none", "&:hover": { boxShadow: "none" } }}
                  >
                    Save Album
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => saveAlbumOfTheDay(album)}
                    disabled={albumOfTheDaySet}
                    sx={{
                      boxShadow: "none",
                      "&:hover": { boxShadow: "none" },
                      ml: 1,
                    }}
                  >
                    Set as Album of the Day
                  </Button>
                  <Link
                    to={{
                      pathname: `/reviews`,
                    }}
                    state={album}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        boxShadow: "none",
                        "&:hover": { boxShadow: "none" },
                        ml: 1,
                      }}
                    >
                      Write Review
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Card>
          </li>
        ))}
      </ul>
      <Typography
        variant="h2"
        sx={{
          fontSize: "2rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "#000000", // primary color
          mb: 2, // margin-bottom
        }}
      >
        Artists
      </Typography>
      <ul>
        {searchResults.artists.map((artist: Artist) => (
          <li
            key={artist.name}
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#000000", // primary color
                marginRight: "10px", // space between artist name and button
                textDecoration: "none",
              }}
              component="a"
              href={artist.url}
            >
              {artist.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => saveArtist(artist)}
              sx={{
                boxShadow: "5px 5px 0px #000",
                "&:hover": { boxShadow: "7px 7px 0px #000" },
                marginLeft: "10px",
              }}
            >
              Save Artist
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
