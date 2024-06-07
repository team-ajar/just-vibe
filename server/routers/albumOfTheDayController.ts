import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

module.exports = {
  getAlbumOfTheDay: (req: Request, res: Response) => {
    prisma.albumOfTheDay.findFirst({
      orderBy: {
        date: 'desc'
      },
      include: {
        album: true,
        user: true
      }
    })
    .then((albumOfTheDay) => {
      res.json(albumOfTheDay);
    })
    .catch((err) => {
      console.error('Error getting album of the day', err);
      res.sendStatus(500);
    })
  },

  setAlbumOfTheDay: (req: Request, res: Response) => {
    const { albumId, userId } = req.body;
    prisma.albumOfTheDay.create({
      data: {
        albumId,
        userId
      },
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err: any) => {
      console.error('Error setting album of the day', err);
      res.sendStatus(500);
    })
  },

  editAlbumOfTheDay: (req: Request, res: Response) => {
    const { id, albumId, userId } = req.body;
    prisma.albumOfTheDay.update({
      where: { id },
      data: { albumId, userId }
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error editing album of the day', err);
      res.sendStatus(500);
    })
  },

  deleteAlbumOfTheDay: (req: Request, res: Response) => {
    const { id } = req.params;
    prisma.albumOfTheDay.delete({
      where: { id: Number(id) }
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error deleting album of the day', err);
      res.sendStatus(500);
    })
  },
}
