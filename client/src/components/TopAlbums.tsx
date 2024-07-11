import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Select, MenuItem, Button, CardMedia } from "../style";
import { TopAlbums } from "./SearchResults";

export const TopAlbumsComponent = () => {
  const [topAlbums, setTopAlbums] = useState<TopAlbums>([
    undefined,
    undefined,
    undefined,
  ]);

  const getAlbums = () => {
    axios.get(`/api/top/albums`).then((response) => {
      setTopAlbums(response.data);
    });
  };

  const deleteSelectedAlbum = (albumId: number | undefined) => {
    if (albumId === undefined) return;
    axios.delete(`/api/top/albums/${albumId}/`).then(() => {
      setTopAlbums((prev) => {
        return prev.map((topAlbum) => {
          if (topAlbum?.album.id === albumId) {
            return undefined;
          }
          return topAlbum;
        });
      });
    });
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const defaultImage =
    "https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png";

  return (
    <Box>
      <Typography variant="h2">Top 3 Albums</Typography>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", pt: 2 }}>
        {topAlbums.map((topAlbum, index) => (
          <Card
            key={index}
            sx={{
              width: 300,
              boxShadow: "5px 5px 0px #000",
              border: "2px solid #000",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 0
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  width: '100%',
                  paddingTop: '100%',
                  backgroundImage: `url(${topAlbum?.album.image || defaultImage})`
                }}
              />
              <Typography variant="h3" sx={{ mt: 1 }}>
                #{index + 1}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => deleteSelectedAlbum(topAlbum?.album?.id)}
                sx={{ mt: 2 }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
