import { Artist, TopArtists } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Select, MenuItem, Button } from "@mui/material";

export const TopArtistsComponent = ({ userId }: { userId: number }) => {
  const [artists, setArtists] = useState<Artist[]>([]);

  const [topArtists, setTopArtists] = useState<(TopArtists | undefined)[]>([
    undefined,
    undefined,
    undefined,
  ]);

  const getArtists = () => {
    axios.get(`/api/top/artists/${userId}`).then((response) => {
      setArtists(response.data.artists);
      let topArtist1 = response.data.topArtists.find(
        (artist: TopArtists) => artist.position === 1
      );
      let topArtist2 = response.data.topArtists.find(
        (artist: TopArtists) => artist.position === 2
      );
      let topArtist3 = response.data.topArtists.find(
        (artist: TopArtists) => artist.position === 3
      );
      setTopArtists([topArtist1, topArtist2, topArtist3]);
    });
  };

  const showSelectedArtist = (
    newArtistId: number,
    position: number,
    artistId: number
  ) => {
    axios
      .post(`/api/top/artists/${artistId}/${position}/${userId}`, {
        newArtistId,
      })
      .then((response) => {
        setTopArtists((prev) => {
          prev[response.data.position - 1] = response.data;
          return [...prev];
        });
      });
  };

  const deleteSelectedArtist = (
    position: number,
    artistId: number | undefined
  ) => {

    if (artistId === undefined) return;
    axios
      .delete(`/api/top/artists/${artistId}/${position}/${userId}`)
      .then(() => {
        setTopArtists((prev) => {
          return prev.map((topArtist) => {
            if (topArtist?.artistId === artistId) {
              return undefined;
            }
            return topArtist;
          });
        });
      });
  };

  useEffect(() => {
    getArtists();
  }, []);

  let topArtist1 = artists.find(
    (artist) => artist.id === topArtists[0]?.artistId
  );
  let topArtist2 = artists.find(
    (artist) => artist.id === topArtists[1]?.artistId
  );
  let topArtist3 = artists.find(
    (artist) => artist.id === topArtists[2]?.artistId
  );

  return (
    <Box >
      <Typography variant="h2">Top 3 Artists</Typography>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {[topArtist1, topArtist2, topArtist3].map((topArtist, index) => (
          <Card key={index} sx={{ width: 300, boxShadow: "5px 5px 0px #000", border: "2px solid #000" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h3" sx={{ mt: 1 }}>{topArtist?.name || "Select Artist"}</Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>#{index + 1}</Typography>
              <Select
                value={topArtist?.id || ""}
                onChange={(e) => showSelectedArtist(Number(e.target.value), index + 1, topArtist?.id || 0)}
                displayEmpty
                fullWidth
                sx={{ mt: 1 }}
              >
                <MenuItem value="">Select Artist</MenuItem>
                {artists.map((artist) => (
                  <MenuItem key={artist.id} value={artist.id}>
                    {artist.name}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteSelectedArtist(index + 1, topArtist?.id)}
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
