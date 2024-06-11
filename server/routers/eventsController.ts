import { Request, Response } from 'express'
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
dotenv.config();

const eventsController = {
  
  saveEvent: (req: Request, res: Response) => {
    const { location, venue } = req.body;
      
      prisma.event.create({
        data: {
         location: String(location),
         venue: String(venue),
         
        }
      })
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
  },

  deleteEvent: (req: Request, res: Response) => {
    const { id } = req.params;
    prisma.review.delete({
      where: {
        id: Number(id),
      }
    })
    .then(() => { res.sendStatus(204) })
    .catch(() => res.sendStatus(500));
  }
};

export default eventsController;