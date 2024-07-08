import { Request, Response } from "express";
require("dotenv").config();
import { PrismaClient } from "@prisma/client";
import { findOrCreateAlbum, setAlbumPosition, findOrCreateArtist, setArtistPosition } from "./Library";
const prisma = new PrismaClient();

const topThreeController = {
  getTopAlbums: (req: Request, res: Response) => {
    const userId = req.user!.id;
    prisma.topAlbums
      .findMany({
        where: {
          userId,
        },
        select: {
          position: true,
          album: {
            select: {
              id: true,
              image: true,
              albumName: true,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
        take: 3,
      })
      .then((topAlbums) => {
        const album1 = topAlbums.find((album) => album.position === 1);
        const album2 = topAlbums.find((album) => album.position === 2);
        const album3 = topAlbums.find((album) => album.position === 3);
        return res.status(200).send([album1, album2, album3]);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  createOrUpdateTopAlbum: (req: Request, res: Response) => {
    const { position, oldAlbumId, userId } = req.params;
    const { newAlbumId } = req.body;
    if (oldAlbumId === "0") {
      prisma.topAlbums
        .create({
          data: {
            position: Number(position),
            albumId: Number(newAlbumId),
            userId: Number(userId),
          },
        })
        .then((topAlbum) => {
          res.status(201).json(topAlbum);
        })
        .catch((error) => {
          console.error("Error creating album:", error);
          res.sendStatus(500);
        });
      return;
    }

    prisma.topAlbums
      .update({
        where: {
          position_albumId_userId: {
            position: Number(position),
            albumId: Number(oldAlbumId),
            userId: Number(userId),
          },
        },
        data: {
          albumId: Number(newAlbumId),
        },
      })
      .then((topAlbum) => {
        res.status(200).json(topAlbum);
      })
      .catch((error) => {
        console.error("Error updating album:", error);
        res.sendStatus(500);
      });
  },

  deleteTopAlbum: (req: Request, res: Response) => {
    const { albumId } = req.params;
    const userId = req.user!.id;
    prisma.topAlbums
      .deleteMany({
        where: {
          userId,
          albumId: Number(albumId),
        },
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error("Error deleting album:", error);
        res.sendStatus(500);
      });
  },

  getTopArtists: (req: Request, res: Response) => {
    const userId = req.user!.id;
    prisma.topArtists
      .findMany({
        where: {
          userId,
        },
        select: {
          position: true,
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
        take: 3,
      })
      .then((topArtists) => {
        const artist1 = topArtists.find((artist) => artist.position === 1);
        const artist2 = topArtists.find((artist) => artist.position === 2);
        const artist3 = topArtists.find((artist) => artist.position === 3);
        return res.status(200).send([artist1, artist2, artist3]);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  

  deleteTopArtist: (req: Request, res: Response) => {
    const { artistId } = req.params;
    const userId = req.user!.id;

    prisma.topArtists
      .deleteMany({
        where: {
          userId,
          artistId: Number(artistId),
        },
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error("Error deleting album:", error);
        res.sendStatus(500);
      });
  },
  updateAlbumRanking: (req: Request, res: Response) => {
    // get user id from session
    const userId = req.user!.id;
    // request body sent by front end
    const { albumName, artistName, image, position } = req.body;
    // find the album id, or create it and give me the new id
    findOrCreateAlbum(albumName, artistName, image, userId)
      .then((albumId) => {
        setAlbumPosition(albumId, userId, position)
          .then((topAlbum) => {
            res.status(201).send(topAlbum);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  updateArtistRanking: (req: Request, res: Response) => {
    // get user id from session
    const userId = req.user!.id;
    // request body sent by front end
    const { artistName, position } = req.body;
    // find the album id, or create it and give me the new id
    findOrCreateArtist(artistName, userId )
      .then((artistId) => {
        setArtistPosition(artistId, userId, position)
          .then((topArtist) => {
            res.status(201).send(topArtist);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};

export default topThreeController;
