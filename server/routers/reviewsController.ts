import { Request, Response} from 'express';
require('dotenv').config();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { findOrCreateAlbum } from "./Library";
const reviewsController = {
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
    const { text, rating, image } = req.body;
    const { albumName, artistName, userId } = req.params;

    findOrCreateAlbum(
      albumName,
      artistName,
      image,
      Number(userId)
    ).then((albumId) => {
      prisma.review
        .create({
          data: {
            albumId: albumId,
            text,
            rating,
            userId: Number(userId),
          },
        })
        .then((review: any) => {
          prisma.post
            .create({
              data: {
                userId: review.userId,
                postType: "REVIEW",
                albumId: review.albumId,
                reviewId: review.id,
              },
            })
            .then(() => {
              return res.status(201).send(review);
            })
            .catch((err) => {
              console.error("Error creating post:", err);
              return res.sendStatus(500);
            });
        })
        .catch((error: any) => {
          console.error("Error adding review:", error);
          res.sendStatus(500);
        });
    });
  },
  deleteReview: (req: Request, res: Response) => {
    const { id, userId } = req.params;
    prisma.review.delete({
      where: {
        userId: Number(userId),
        id: Number(id),
      }
    })
    .then(() => {
      res.sendStatus(204)
    })
    .catch((error: any) => {
      console.error('Error deleting review:', error)
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
      console.error('Error initiated while updating:', error)
      res.sendStatus(500)
    })
  }
};

export default reviewsController;
