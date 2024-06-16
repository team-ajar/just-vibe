import { Artist, TopArtists } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
    <div>
      <h2>Top 3 Artists</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <div>
          <h3>
          {topArtist1?.name || "Select Artist"}
          </h3>
          <label>#1</label>
          <select
            value={topArtist1?.id || ""}
            onChange={(e) => {
              if (e.target.value === "") return;
              showSelectedArtist(
                Number(e.target.value),
                1,
                topArtist1?.id || 0
              );
            }}
          >
            {!topArtist1 && <option value="">Select Artist</option>}
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => deleteSelectedArtist(1, topArtist1?.id)}
            type="button"
          >
            Delete
          </button>
        </div>

        <div>
        <h3>
          {topArtist2?.name || "Select Artist"}
          </h3>
          <label>#2</label>
          <select
            value={topArtist2?.id || ""}
            onChange={(e) => {
              if (e.target.value === "") return;
              showSelectedArtist(
                Number(e.target.value),
                2,
                topArtist2?.id || 0
              );
            }}
          >
            {!topArtist2 && <option value="">Select Artist</option>}
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => deleteSelectedArtist(2, topArtist2?.id)}
            type="button"
          >
            Delete
          </button>
        </div>

        <div>
        <h3>
          {topArtist3?.name || "Select Artist"}
          </h3>
          <label>#3</label>
          <select
            value={topArtist3?.id || ""}
            onChange={(e) => {
              if (e.target.value === "") return;
              showSelectedArtist(
                Number(e.target.value),
                3,
                topArtist3?.id || 0
              );
            }}
          >
            {!topArtist3 && <option value="">Select Artist</option>}
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => deleteSelectedArtist(3, topArtist3?.id)}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
