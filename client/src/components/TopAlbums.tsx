import { Album, TopAlbums } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Select, MenuItem, Button, CardMedia } from "../style";

export const TopAlbumsComponent = ({ userId }: { userId: number }) => {
  const [albums, setAlbums] = useState<Album[]>([]);

  const [topAlbum, setTopAlbum] = useState<(TopAlbums | undefined)[]>([
    undefined,
    undefined,
    undefined,
  ]);

  const getAlbums = () => {
    axios.get(`/api/top/albums/${userId}`).then((response) => {
      setAlbums(response.data.albums);
      let topAlbum1 = response.data.topAlbums.find(
        (album: TopAlbums) => album.position === 1
      );
      let topAlbum2 = response.data.topAlbums.find(
        (album: TopAlbums) => album.position === 2
      );
      let topAlbum3 = response.data.topAlbums.find(
        (album: TopAlbums) => album.position === 3
      );
      setTopAlbum([topAlbum1, topAlbum2, topAlbum3]);
    });
  };

  const showSelectedAlbum = (
    newAlbumId: number,
    position: number,
    albumId: number
  ) => {
    axios
      .post(`/api/top/albums/${albumId}/${position}/${userId}`, {
        newAlbumId,
      })
      .then((response) => {
        setTopAlbum((prev) => {
          prev[response.data.position - 1] = response.data;
          return [...prev];
        });
      });
  };

  const deleteSelectedAlbum = (
    position: number,
    albumId: number | undefined
  ) => {
    if (albumId === undefined) return;
    axios.delete(`/api/top/albums/${albumId}/${position}/${userId}`)
      .then(() => {
        setTopAlbum((prev) => {
          return prev.map((topAlbum) => {
            if (topAlbum?.albumId === albumId) {
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

  const defaultImage = "https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png";
  let topAlbum1 = albums.find((album) => album.id === topAlbum[0]?.albumId);
  let topAlbum2 = albums.find((album) => album.id === topAlbum[1]?.albumId);
  let topAlbum3 = albums.find((album) => album.id === topAlbum[2]?.albumId);

  return (
    <Box>
      <Typography variant="h2">Top 3 Albums</Typography>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {[topAlbum1, topAlbum2, topAlbum3].map((topAlbum, index) => (
          <Card key={index} sx={{ width: 300, boxShadow: "5px 5px 0px #000", border: "2px solid #000" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 0 }}>
              <CardMedia
                component="div"
                sx={{
                  width: '100%',
                  paddingTop: '100%',
                  backgroundImage: `url(${topAlbum?.image || defaultImage})`
                }}
              />
              <Typography variant="h3" sx={{ mt: 1 }}>#{index + 1}</Typography>
              <Select
                value={topAlbum?.id || ""}
                onChange={(e) => showSelectedAlbum(Number(e.target.value), index + 1, topAlbum?.id || 0)}
                displayEmpty
                fullWidth
                sx={{ mt: 1 }}
              >
                <MenuItem value="">Select Album</MenuItem>
                {albums.map((album) => (
                  <MenuItem key={album.id} value={album.id}>
                    {album.albumName}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteSelectedAlbum(index + 1, topAlbum?.id)}
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
