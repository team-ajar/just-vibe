import { Request, Response } from "express";
require("dotenv").config();
import { PrismaClient } from "@prisma/client";
import { findOrCreateAlbum, setAbumPosition } from "./Library";
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
    prisma.artist
      .findMany({
        orderBy: {
          name: "asc",
        },
        where: {
          userId: req.user!.id,
        },
      })
      .then((artists) => {
        prisma.topArtists
          .findMany({
            where: {
              userId: req.user!.id,
            },
            orderBy: {
              position: "asc",
            },
          })
          .then((topArtists) => {
            res.status(200).json({ artists, topArtists });
          });
      })
      .catch((error) => {
        console.error("Error retrieving albums:", error);
        res.sendStatus(500);
      });
  },

  createOrUpdateTopArtist: (req: Request, res: Response) => {
    const { position, oldArtistId, userId } = req.params;
    const { newArtistId } = req.body;

    if (oldArtistId === "0") {
      prisma.topArtists
        .create({
          data: {
            position: Number(position),
            artistId: Number(newArtistId),
            userId: Number(userId),
          },
        })
        .then((topArtist) => {
          res.status(201).json(topArtist);
        })
        .catch((error) => {
          console.error("Error creating album:", error);
          res.sendStatus(500);
        });
      return;
    }

    prisma.topArtists
      .update({
        where: {
          position_artistId_userId: {
            position: Number(position),
            artistId: Number(oldArtistId),
            userId: Number(userId),
          },
        },
        data: {
          artistId: Number(newArtistId),
        },
      })
      .then((topArtist) => {
        res.status(200).json(topArtist);
      })
      .catch((error) => {
        console.error("Error updating album:", error);
        res.sendStatus(500);
      });
  },

  deleteTopArtist: (req: Request, res: Response) => {
    const { position, artistId, userId } = req.params;

    prisma.topArtists
      .delete({
        where: {
          position_artistId_userId: {
            position: Number(position),
            artistId: Number(artistId),
            userId: Number(userId),
          },
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
  updateRanking: (req: Request, res: Response) => {
    // get user id from session
    const userId = req.user!.id;
    // request body sent by front end
    const { albumName, artistName, image, position } = req.body;
    // find the album id, or create it and give me the new id
    findOrCreateAlbum(albumName, artistName, image, userId)
      .then((albumId) => {
        setAbumPosition(albumId, userId, position)
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
};

export default topThreeController;
