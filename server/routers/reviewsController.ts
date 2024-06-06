import express, { Request, Response} from 'express';
require('dotenv').config();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;

module.exports = {
  createReview: (req: Request, res: Response) => {

    //use req.body for data sent in the request body
    //this is a post
    const { albumId, text, rating } = req.body;
    
    //prisma crud operation
    prisma.review.create({
      data: {
        albumId,
        text,
        rating,
      },
    })
    .then((response: any) => {
      console.log(response);
      //sendStatus sets the status AND send it to the client
      res.sendStatus(201)
    })
    .catch((error: any) => {
      console.error('Error adding review:', error)
      //set status and send to client
      res.sendStatus(500)
    })
  },
  deleteReview: (req: Request, res: Response) => {
    //destructure the id from the req.params
    //parameters being available paths in the URL
    const { id } = req.params;
    prisma.review.delete({
      where: {
        id,
      }
    })
    .then((response: any) => {
      console.log(response)
      //204 status code if the action has been enacted
      //and no further info is needed
      res.sendStatus(204)
    })
    .catch((error: any) => {
      console.log('Error deleting review:', error)
      res.sendStatus(500)
    })
  }
};
