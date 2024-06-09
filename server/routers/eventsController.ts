import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import axios, { AxiosResponse } from 'axios';
require('dotenv').config();



module.exports = {
  
  saveEvent: (req: Request, res: Response) => {
    const { location, venue } = req.body;
      
      prisma.event.create({
        data: {
         location: String(location),
         venue: String(venue),
         
        }
      })
        .then((data: any) => res.sendStatus(201))
        .catch((err: any) => res.sendStatus(500));
  },

  deleteEvent: (req: Request, res: Response) => {
    const { id } = req.params;
    prisma.review.delete({
      where: {
        id: Number(id),
      }
    })
    .then((response: any) => { res.sendStatus(204) })
    .catch((err: any) => res.sendStatus(500));
  }
};
