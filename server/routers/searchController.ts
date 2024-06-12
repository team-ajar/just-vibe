import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";

require("dotenv").config();

const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;
const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

module.exports = {
  handleSearch: (req: Request, res: Response) => {
    const { search } = req.params;
    console.log('handleSearch: ', search);
    const searchResults = { artists: Object, albums: Object };
    return axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=${LAST_FM_API_KEY}&format=json`
      )
      .then((data: AxiosResponse) => {
        searchResults.albums = data.data.results.albummatches;

        return axios.get(
          `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${search}&api_key=${LAST_FM_API_KEY}&format=json`
        );
        // .catch((err: AxiosResponse) => console.error('err: ', err));
      })
      .then((data: AxiosResponse) => {
        searchResults.artists = data.data.results.artistmatches;
        return axios.get(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&keyword=${search}`,
          { headers: { "Content-Type": "application/json" } }
        );
      })
      .then(() => {
        res.status(200).send(searchResults);
      })
      .catch((err: AxiosResponse) => {
        console.error("err: ", err);
        res.sendStatus(500);
      });
  },
};
