<<<<<<< Updated upstream
module.exports = {
  
=======
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import axios, { AxiosResponse } from 'axios';
require('dotenv').config();

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

module.exports = {
  getEvent: (req: Request, res: Response) => {
    axios.get(`https://app.ticketmaster.com/discovery/v2/attractions/K8vZ9175BhV.json?${TICKETMASTER_API_KEY}`)
    .then((data: AxiosResponse) => {

    })
    .catch((err: AxiosResponse) => console.error('err: ', err));
  },

  saveEvent: (req: Request, res: Response) => {
    const { artistId, location, description } = req.body;
      
      prisma.userEvent.create({
        data: {
          artistId: Number(artistId),
          location: String(location),
          description: String(description)
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
>>>>>>> Stashed changes
};
