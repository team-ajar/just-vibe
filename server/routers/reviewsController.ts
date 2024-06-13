import { Request, Response} from 'express';
require('dotenv').config();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const reviewsController = {
// const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;
  getReviews: (req: Request, res: Response) => {

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
        return res.status(200).json(response)
      })
      .catch((error) => {
        console.error('Error retrieving list:', error)
        return res.sendStatus(500)
      });
    })
  },
  createReview: (req: Request, res: Response) => {
    const { text, rating, albumId } = req.body;
    const { albumName, artistName, userId } = req.params;

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
        res.status(201).json(response)
      })
      .catch((error: any) => {
        console.error('Error adding review:', error)
        res.sendStatus(500)
      })
    })
  },
  deleteReview: (req: Request, res: Response) => {
    const { id, userId } = req.params;
    prisma.review.delete({
      where: {
        userId: Number(userId),
        id: Number(id),
      }
    })
    .then((response: any) => {
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
      res.status(200).json(response)
    })
    .catch((error: any) => {
      console.log('Error initiated while updating:', error)
      res.sendStatus(500)
    })
  }
};

export default reviewsController;
