import axios from "axios";
import React from "react";
import { MenuItem, Select } from "../style";
import { Album, TopAlbums } from "./SearchResults";
function AlbumRanking({
  album,
  topAlbums,
  refresh,
}: {
  album: Album;
  topAlbums: TopAlbums;
  refresh: () => void;
}) {
  function setAlbumPosition(position: number) {
    axios
      .post(`/api/top/albums/rank`, {
        albumName: album.name,
        artistName: album.artist,
        image: album.image[3]["#text"],
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
    <Select value="" displayEmpty sx={{ boxShadow: "none", py: "8px", height: "50%" }}>
      <MenuItem value="">Ranking</MenuItem>
      <MenuItem onClick={() => setAlbumPosition(1)}>
        1. {topAlbums[0] ? topAlbums[0].album.albumName : "Empty"}
      </MenuItem>
      <MenuItem onClick={() => setAlbumPosition(2)}>
        2. {topAlbums[1] ? topAlbums[1].album.albumName : "Empty"}
      </MenuItem>
      <MenuItem onClick={() => setAlbumPosition(3)}>
        3. {topAlbums[2] ? topAlbums[2].album.albumName : "Empty"}
      </MenuItem>
    </Select>
  );
}

export default AlbumRanking;
