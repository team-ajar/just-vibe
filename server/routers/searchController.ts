// const axios = require("axios");
import axios, { AxiosResponse } from 'axios';
import express, { Request, Response} from 'express';
require('dotenv').config();

const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;

module.exports = {
  handleSearch: (req: Request, res: Response) => {
    // console.log(req.params);
    // retrieve search query from params
    const { search } = req.params;
    // create storage for search results
    // store results in an obj -> {artists: artist.search, albums: album.search}
    const searchResults = {artists: Object, albums: Object, events: Object};
    // pass search query
    // axios req to album search
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=${LAST_FM_API_KEY}&format=json`)
      .then((data: AxiosResponse) => {

        searchResults.albums = data.data.results.albummatches;

        // axios req to artist search
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${search}&api_key=${LAST_FM_API_KEY}&format=json`)
        .then((data: AxiosResponse) => {

          searchResults.artists = data.data.results.artistmatches;
          
          axios.get()
          .then((data: AxiosResponse) => {

            searchResults.events = data.data

          })
          // respond w {artists: artist.search, albums: album.search}
          res.status(200).send(searchResults);
        })
        .catch((err: AxiosResponse) => console.error('err: ', err));
      })
      .catch((err: AxiosResponse) => console.error('err: ', err));
  }
};
