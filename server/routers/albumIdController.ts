import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const albumIdController = {
  getAlbumId: (req: Request, res: Response) => {
    const { albumName, artistName } = req.body;

    prisma.album.findFirst({
      where: {
        albumName,
        artistName,
      }
    })
    .then((album: any) => {
      if (!album) {
        res.sendStatus(404);
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

export default albumIdController;
