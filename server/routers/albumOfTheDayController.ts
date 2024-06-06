import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

module.exports = {
  getAlbumOfTheDay: (req: Request, res: Response) => {

  },

  setAlbumOfTheDay: (req: Request, res: Response) => {
    const { albumId, userId } = req.body;
    prisma.albumOfTheDay.create({
      data: {
        albumId,
        userId
      },
    })
    .then((newAlbumOfTheDay: any) => {
      res.json(newAlbumOfTheDay);
    })
    .catch((err: any) => {
      console.error('Error setting album of the day', err);
      res.sendStatus(500);
    })
  },

  editAlbumOfTheDay: (req: Request, res: Response) => {

  },

  deleteAlbumOfTheDay: (req: Request, res: Response) => {

  },
}
