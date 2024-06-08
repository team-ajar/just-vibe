import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

module.exports = {
  saveEvent: (req: Request, res: Response) => {
    const { artistName, location, description } = req.body;
      
      prisma.userEvent.create({
        data: {
          name: artistName,
          location,
          description
        }
      })
        .then((data: any) => res.sendStatus(201))
        .catch((err: any) => res.sendStatus(500));
  },

  deleteEvent: (req: Request, res: Response) => {
    const { id } = req.params;
    prisma.review.delete({
      where: {
        id,
      }
    })
    .then((response: any) => { res.sendStatus(204) })
    .catch((err: any) => res.sendStatus(500));
  }
};
