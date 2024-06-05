const axios = require("axios");
// import axios from 'axios'
import express, { Request, Response} from 'express';
require('dotenv').config();

const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;

module.exports = {
  handleSearch: (req: Request, res: Response) => {
    // console.log(req);
    // retrieve search query from params
    const { search } = req.params;
    // create storage for search results
    const searchResults = {artists: Object, albums: Object};
    // pass search query
    // axios req to album search
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=${LAST_FM_API_KEY}&format=json`)
      .then((data: Object) => {
        console.log('data: ', data);
        // searchResults.artists = data;
      })
      .catch((err: Object) => console.error('err: ', err));
    // axios req to artist search
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${search}&api_key=${LAST_FM_API_KEY}&format=json`)
      .then((data: Object) => {
        console.log('data: ', data);
        // searchResults.albums = data;
      })
      .catch((err: Object) => console.error('err: ', err));
    // store results in an obj -> {artists: artist.search, albums: album.search}
    // respond w {artists: artist.search, albums: album.search}
  }
};
