import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  List,
  ListItem,
  Snackbar,
  SnackbarContent,
  Tabs,
  Tab,
} from "../style";
import AlbumRanking from "./AlbumRanking";

interface Artist {
  image: any;
  name: string;
  url: string;
}

export interface Album {
  id: number;
  image: { [k: string]: string }[];
  name: string;
  artist: string;
  url: string;
}

interface SearchResultsData {
  artists: Artist[];
  albums: Album[];
}

export type TopAlbums = (
  | {
      position: number;
      album: {
        albumName: string;
        image: string,
        id: number
      };
    }
  | undefined
)[];
const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [value, setValue] = useState(0);

  const loadUser = () => {
    axios
      .get("/api/user")
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  };

  const [topAlbums, setTopAlbums] = useState<TopAlbums>([
    undefined,
    undefined,
    undefined,
  ]);

  const getAlbums = () => {
    if (user.id === 0) return;
    axios.get<TopAlbums>(`/api/top/albums`).then((response) => {
      setTopAlbums(response.data);
    });
  };

  const saveArtist = (artist: Artist) => {
    axios
      .post(`/api/music/artist/${user.id}`, {
        artistName: artist.name,
      })
      .then(() => {
        setMessage(`${artist.name} saved!`);
        setSnackbarOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const saveAlbumOfTheDay = (album: any) => {
    if (albumOfTheDaySet) {
      alert("You have already set an album of the day for today.");
      return;
    }

    const { name: albumName, artist: artistName } = album;

    // axios
    //   .post("/api/album-id", { albumName, artistName })
    //   .then((response) => {
    //     const albumId = response.data.albumId;

    //     axios
    //       .get("/api/user")
    //       .then((profileResponse) => {
    //         const userId = profileResponse.data.id;

    //         axios
    //           .post("/api/album-of-the-day", {
    //             albumName: album.name
    //           })
    //           .then(() => {
    //             setAlbumOfTheDaySet(true);
    //             setMessage(`Album of the day set for ${album.name}!`);
    //             setSnackbarOpen(true);
    //           })
    //           .catch((err) =>
    //             console.error("Error setting album of the day", err)
    //           );
    //       })
    //       .catch((err) => console.error("Error getting userId", err));
    //   })
    axios
      .post("/api/album-of-the-day", {
        albumName,
        artistName,
        image: album.image[3]["#text"],
      })
      .then(() => {
        setAlbumOfTheDaySet(true);
        setMessage(`Album of the day set for ${album.name}!`);
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error("Error getting albumId", err);
        setMessage(
          "Album missing, please save before setting as album of the day!"
        );
        setSnackbarOpen(true);
      });
  };

  const handleOpen = () => {
    setSnackbarOpen(false);
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  const handleTabChange = (event: any, newVal: any) => {
    setValue(newVal);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
    };
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
  useEffect(() => {
    if (user.id === 0) return;
    getAlbums();
  }, [user]);
  return (
    <Box p={2}>
      <Typography
        variant="h1"
        sx={{
          fontSize: "3rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "2px",
          mb: 4, // margin-bottom
          mt: 2,
        }}
      >
        Search Results for {query}
      </Typography>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="Albums" value={0} {...a11yProps(0)} />
        <Tab label="Artists" value={1} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <List>
          {searchResults.albums.map((album: Album, i: any) => (
            <ListItem
              sx={{
                width: 1,
                display: "flex",
                mb: 2,
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
              key={i}
            >
              <Card
                sx={{
                  display: "flex",
                  mb: 2,
                  flexDirection: { xs: "column", sm: "row" },
                  width: 1,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: { xs: "100%", sm: 151 } }}
                  image={album.image[3]["#text"]}
                  alt={album.name}
                />
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
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
                    sx={{
                      display: "flex",
                      alignItems: {
                        xs: "center",
                      },
                      pb: 1,
                      px: 1,
                      pl: 1,
                      flexWrap: "wrap",
                      gap: 1,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => saveAlbumOfTheDay(album)}
                      disabled={albumOfTheDaySet}
                      sx={{
                        boxShadow: "none",
                        "&:hover": { boxShadow: "none" },
                        ml: { xs: 0, sm: 1 },
                        mt: { xs: 1, sm: 0 },
                      }}
                    >
                      Set as Album of the Day
                    </Button>
                    <AlbumRanking
                        album={album}
                        topAlbums={topAlbums}
                        refresh={getAlbums}
                      />
                    <Link
                      to={{
                        pathname: `/reviews`,
                      }}
                      state={{ album, query }}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                          boxShadow: "none",
                          "&:hover": { boxShadow: "none" },
                          flex: "1 1 auto",
                          maxWidth: { xs: "100%", sm: "unset" },
                          ml: { xs: 0, sm: 1 },
                          mt: { xs: 1, sm: 0 },
                        }}
                      >
                        Write Review
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Card>
            </ListItem>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List>
          {searchResults.artists.map((artist: Artist) => (
            <ListItem
              key={artist.name}
              sx={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
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
                  whiteSpace: "nowrap",
                  minWidth: "100px",
                }}
              >
                Save Artist
              </Button>
            </ListItem>
          ))}
        </List>
      </TabPanel>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent message={message} />
      </Snackbar>
    </Box>
  );
};

export default SearchResults;
