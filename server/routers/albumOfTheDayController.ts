import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import dayjs from 'dayjs';

const prisma = new PrismaClient();

const albumOfTheDayController = {

  getAlbumOfTheDay: (req: Request, res: Response) => {
    const userId = req.user?.id;

    prisma.albumOfTheDay.findFirst({
      where: {
        userId: userId,
      },
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
    const { albumId } = req.body;
    const userId = req.user?.id;
    const todayStart = dayjs().startOf('day').toISOString();
    const todayEnd = dayjs().endOf('day').toISOString();

    prisma.albumOfTheDay.findFirst({
      where: {
        userId,
        date: {
          gte: todayStart,
          lt: todayEnd,
        }
      }
    })
    .then((existingEntry) => {
      if (existingEntry) {
        return prisma.albumOfTheDay.update({
          where: { id: existingEntry.id },
          data: {
            album: { connect: { id: albumId } },
            date: new Date(),
          },
        });
      } else {
        return prisma.albumOfTheDay.create({
          data: {
            album: { connect: { id: albumId } },
            user: { connect: { id: userId } },
            date: new Date(),
          },
        });
      }
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err: any) => {
      console.error('Error setting album of the day', err);
      res.sendStatus(500);
    });
  },

  editAlbumOfTheDay: (req: Request, res: Response) => {
    const { id } = req.params;
    const { albumId } = req.body;

    prisma.albumOfTheDay.update({
      where: { id: Number(id) },
      data: { albumId: Number(albumId) },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error editing album of the day', err);
      res.sendStatus(500);
    });
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

export default albumOfTheDayController;
