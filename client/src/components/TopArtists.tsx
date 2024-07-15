import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "../style";
import { TopArtists } from "./SearchResults";
import DeleteIcon from '@mui/icons-material/Delete';

export const TopArtistsComponent = () => {

  const [topArtists, setTopArtists] = useState<TopArtists>([
    undefined,
    undefined,
    undefined,
  ]);



  const getArtists = () => {
    axios.get(`/api/top/artists`).then((response) => {
      setTopArtists(response.data);
    });
  };

  const deleteSelectedArtist = (
    artistId: number | undefined
  ) => {

    if (artistId === undefined) return;
    axios
      .delete(`/api/top/artists/${artistId}/`)
      .then(() => {
        setTopArtists((prev) => {
          return prev.map((topArtist) => {
            if (topArtist?.artist.id === artistId) {
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


  return (
    <Box >
      <Typography variant="h2">Top 3 Artists</Typography>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", pt: 2 }}>
        {topArtists.map((topArtist, index) => (
          <Card key={index} sx={{ width: 300, boxShadow: "5px 5px 0px #000", border: "2px solid #000" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", pt: "25%" }}>
              
              <Typography variant="h3" sx={{ mt: 1 }}>{topArtist?.artist.name || "Select Artist"}</Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>#{index + 1}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => deleteSelectedArtist(topArtist?.artist.id)}
                sx={{ mt: 2, position: "absolute", top: 0, right: "10px" }}
              >
                <DeleteIcon/>
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
