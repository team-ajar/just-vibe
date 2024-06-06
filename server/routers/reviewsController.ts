import axios, { AxiosResponse } from 'axios';
import express, { Request, Response} from 'express';
require('dotenv').config();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;

module.exports = {
  createReview: (req: Request, res: Response) => {

    const { albumId, text, rating } = req.body;
    
    prisma.review.create({
      data: {
        albumId,
        text,
        rating,
      },
    })
    .then((response: any) => {
      console.log(response);
      res.sendStatus(201)
    })
    .catch((error: any) => {
      console.error('Error adding review:', error)
      res.sendStatus(500)
    })
  },
};
