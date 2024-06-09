import express, { Request, Response} from 'express';
require('dotenv').config();
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
//import AsyncHandler from "../middleware/AsyncHandler";

// const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;

//methods that serves as request handlers
module.exports = {
  getReviews: (req: Request, res: Response) => {

    console.log('REQUEST RECEIVED')

    const { albumName, artistName } = req.params;
    prisma.album.findFirst({
      where: { albumName, artistName }
    })
    .then((album) => {
      if (album === null){
        return res.status(400).json({error: "Album missing, please save the album before adding a review"})
      }
      prisma.review.findMany({
        where : { albumId: album.id }
      })
      .then((response) => {
        console.log('GET REVIEWS RESPONSE HERE', response)
        console.log('GET REVIEWS ALBUM ID', albumName)
        console.log('')
        return res.status(200).json(response)
      })
      .catch((error) => {
        console.error('Error retrieving list:', error)
        return res.sendStatus(500)
      });
    })
  }, 
  createReview: (req: Request, res: Response) => {

    //use req.body for data sent in the request body
    //this is a post
    console.log('REQ BODY HEREE!', req.body);
    const { text, rating, albumId } = req.body;
    const { albumName, artistName, userId } = req.params;
    //prisma crud operation
    prisma.album.findFirst({
      where: { albumName, artistName }
    })
    .then((album) => {
      if (album === null){
        return res.status(404).send("Album missing, please save before writing review!")
      }
      prisma.review.create({
        data: {
          albumId: album.id,
          text,
          rating,
          userId: Number(userId),
        },
      })
      .then((response: any) => {
        console.log(response);
        //sendStatus sets the status AND send it to the client
        res.status(201).json(response)
      })
      .catch((error: any) => {
        console.error('Error adding review:', error)
        //set status and send to client
        res.sendStatus(500)
      })
    })
  },
  deleteReview: (req: Request, res: Response) => {
    //destructure the id from the req.params
    //parameters being available paths in the URL
    const { id, userId } = req.params;
    prisma.review.delete({
      where: {
        //all params are strings so convert to number!!!
        userId: Number(userId),
        id: Number(id),
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
  },
  updateReview: (req: Request, res: Response) => {
    const { id, userId } = req.params;
    const { text, rating } = req.body;
    prisma.review.update({
      where: {
        id: Number(id),
        userId: Number(userId),
      }, 
      data: {
        text: text,
        rating: rating,
      }
    })
    .then((response: any) => {
      console.log(response);
      //200 status code for updated resource
      //sendStatus to send the status and send it to client
      res.status(200).json(response)
    })
    .catch((error: any) => {
      console.log('Error initiated while updating:', error)
      res.sendStatus(500)
    })
  }
};
