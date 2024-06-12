import express, { Request, Response} from 'express';
require('dotenv').config();
import { PrismaClient, Prisma } from '@prisma/client'
// const prisma = new PrismaClient()
const prisma = new PrismaClient({log: ["query"]})

module.exports = {
  getTopAlbums: (req: Request, res: Response) => {

    //this request handler will retrieve all albums
    //and add them to a list that will be shown to the user
    const { userId } = req.params;
    //prisma ORM converts to SQL

    //use findMany to retrieve all albums with the
    
    prisma.album.findMany({
      orderBy: {
        albumName: 'asc'
      }
    })
    .then((albums) => {
      //console.log('ALBUMS HERE', albums)
      //we want all records in this table
      prisma.topAlbums.findMany({
        where: {
          userId: Number(userId)
        },
        orderBy: {
          position: 'asc'
        }
      })
      .then((topAlbums) => {
        res.status(200).json({albums, topAlbums})
      })
    })
    .catch((error) => {
      console.error('Error retrieving albums:', error)
      res.sendStatus(500)
    })

  },

  showTopAlbums: (req: Request, res: Response) => {

  },

  updateTopAlbum: (req: Request, res: Response) => {

  },

  deleteTopAlbum: (req: Request, res: Response) => {

  }
}