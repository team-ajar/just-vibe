import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// const foundUser = prisma.user.findMany({});

require("dotenv").config();

const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;

// interface foundUser {
//   id: number;
//   name: string;
//   username: string;
//   googleId: string;
//   location: string;
//   bio: string;
//   image: string;
//   isFollowing: boolean;
// }

const searchController = {
  handleMusicSearch: (req: Request, res: Response) => {
    const { search } = req.params;
    const searchResults = { artists: Object, albums: Object };
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=${LAST_FM_API_KEY}&format=json`
      )
      .then((data: AxiosResponse) => {
        searchResults.albums = data.data.results.albummatches;

        axios
          .get(
            `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${search}&api_key=${LAST_FM_API_KEY}&format=json`
          )
          .then((data: AxiosResponse) => {
            searchResults.artists = data.data.results.artistmatches;

            res.status(200).send(searchResults);
          })
          .catch((err: AxiosResponse) => console.error("err: ", err));
      })
      .catch((err: AxiosResponse) => console.error("err: ", err));
  },
  handleUserSearch: async (req: Request, res: Response) => {
    const { userId, query } = req.params;

    prisma.user
      .findMany({
        where: {
          OR: [
            {
              username: {
                contains: query,
              },
            },
            {
              name: {
                contains: query,
              },
            },
          ],
          AND: [
            {
              id: {
                not: Number(userId),
              },
            },
          ],
        },
      })
        .then((found: any) => {
          if (found.length) {
            res.status(201).send(found);
          } else {
            res.status(404).send('No users found');
          }
        })
        .catch(() => res.sendStatus(500));
  },
};

export default searchController;
