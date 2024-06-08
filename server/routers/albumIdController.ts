import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

module.exports = {
  // find the album in the db and get its album id
  getAlbumId: (req: Request, res: Response) => {
    const { albumName, artistName } = req.body;

    prisma.album.findFirst({
      where: {
        albumName,
        artistName,
      }
    })
    .then((album: any) => {
      // if there is no album send a 404 error
      if (!album) {
        res.sendStatus(404);
        // if there is an album, send back the album id
      } else {
        res.json({ albumId: album.id })
      }
    })
    .catch((err) => {
      console.error('Error retrieving albumId', err);
      res.sendStatus(500);
    });
  }
};
