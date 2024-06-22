import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const musicController = {
  saveArtist: (req: Request, res: Response) => {
    const { artistName } = req.body;
    const { userId } = req.params;

    prisma.artist
      .findMany({
        where: {
          name: artistName,
        },
      })
      .then((found: any) => {
        if (!found.length) {
          prisma.artist
            .create({
              data: {
                name: artistName,
                userId: Number(userId),
              },
            })
            .then(() => res.sendStatus(201))
            .catch((err: any) => {
              console.error("Could not save artist", err);
              res.sendStatus(500);
            });
        } else {
          res.status(404).send("Artist is already saved");
        }
      })
      .catch((err) => console.error(err));
  },

  saveAlbum: (req: Request, res: Response) => {
    const {
      albumName,
      artistName,
      image,
    }: { albumName: string; artistName: string; image: string } = req.body;
    const { userId } = req.params;

    prisma.album
      .findMany({
        where: {
          albumName,
          artistName,
          userId: Number(userId)
        },
      })
      .then((found: any) => {
        if (!found.length) {
          prisma.album
            .create({
              data: {
                artistName,
                albumName,
                image,
                userId: Number(userId),
              },
            })
            .then(() => res.sendStatus(201))
            .catch((err: any) => {
              console.error("Could not save album", err);
              res.sendStatus(500);
            });
        } else {
          res.status(404).send("Album is already saved");
        }
      })
      .catch((err) => console.error(err));
  },

  readAlbums: (req: Request, res: Response) => {
    const userId = req.user?.id;

    prisma.album.findMany({
      where: {
        userId: userId
      }
    })
    .then(albums => {
      res.status(201).send(albums);
    })
    .catch(err => {
      console.error('Error fetching albums', err);
      res.sendStatus(500);
    });
  }
};

export default musicController;
