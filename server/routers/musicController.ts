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
  //delete the save album method, and transport the logic to
  //the findOrCreateAlbum method inside Library.ts

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
