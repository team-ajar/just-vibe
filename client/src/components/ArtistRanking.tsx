import axios from "axios";
import React from "react";
import { MenuItem, Select } from "../style";
import { Artist, TopArtists } from "./SearchResults";
function ArtistRanking({
  artist,
  topArtists,
  refresh,
}: {
  artist: Artist;
  topArtists: TopArtists;
  refresh: () => void;
}) {
  function setArtistPosition(position: number) {
    axios
      .post(`/api/top/artists/rank`, {
        artistName: artist.name,
        position,
      })
      .then(() => {
        refresh();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <Select value="" displayEmpty sx={{ boxShadow: "none", py: "8px", height: "40px" }}>
      <MenuItem value="">Ranking</MenuItem>
      <MenuItem onClick={() => setArtistPosition(1)}>
        1. {topArtists[0] ? topArtists[0].artist.name : "Empty"}
      </MenuItem>
      <MenuItem onClick={() => setArtistPosition(2)}>
        2. {topArtists[1] ? topArtists[1].artist.name : "Empty"}
      </MenuItem>
      <MenuItem onClick={() => setArtistPosition(3)}>
        3. {topArtists[2] ? topArtists[2].artist.name : "Empty"}
      </MenuItem>
    </Select>
  );
}

export default ArtistRanking;