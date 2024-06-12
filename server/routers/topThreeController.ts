import express, { Request, Response} from 'express';
require('dotenv').config();
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient();

module.exports = {
  getTopAlbums: (req: Request, res: Response) => {

    //this request handler will retrieve all albums
    //and add them to a list that will be shown to the user
    let { userId } = req.params;
    const userIdNumber = Number(userId);

    if (userIdNumber < 0){
      return res.sendStatus(400);
    }
    //object relational mapping
    //prisma ORM converts to SQL

    //use findMany to retrieve all albums saved within the database
    
    prisma.album.findMany({
      orderBy: {
        albumName: 'asc' //put in order alphabetically with 'asc' over 'desc'
      }
    })
    //we have all albums from the schemas
    .then((albums) => {
      //console.log('ALBUMS HERE', albums)
      //lets get all the top albums for the user
      prisma.topAlbums.findMany({
        where: {
          userId: Number(userId)
        },
        orderBy: {
          position: 'asc'
        }
      })
      //after we have all topAlbums for the user
      .then((topAlbums) => {
        //return a object containing the albums
        //to show in the select menu
        //and the top albums to display
        res.status(200).json({albums, topAlbums})
      })
    })
    .catch((error) => {
      //handle any error in the topAlbums retrieval
      console.error('Error retrieving albums:', error)
      res.sendStatus(500)
    })

  },

  createTopAlbum: (req: Request, res: Response) => {
    
    const { position, albumId, userId } = req.params;
    
    
    //CREATE top album at a specified position
    prisma.topAlbums.create({
      data: {
        position: Number(position),
        albumId: Number(albumId),
        userId: Number(userId),
      }
    })
    .then((topAlbum) => {
      console.log(topAlbum);
      res.status(201).json(topAlbum)
    })
    .catch((error) => {
      console.error('Error posting topAlbum:', error)
      res.sendStatus(500);
    })
  },

  updateTopAlbum: (req: Request, res: Response) => {

    const { position, albumId, userId } = req.params;
    const { newAlbumId } = req.body;


    prisma.topAlbums.update({
      where: {
        position_albumId_userId : {
          position: Number(position),
          albumId: Number(albumId),
          userId: Number(userId),
        }
      },
      //unlike the delete, we don't need data
      //because we are completely removing it
      //however in update we need to know exactly
      //which data TO update
      data: {
        albumId: Number(newAlbumId)
      }
    })
    .then((topAlbum) => {
      console.log(topAlbum);
      res.status(200).json(topAlbum);
    })
    .catch((error) => {
      console.error('Error while updating:', error)
      res.sendStatus(500);
    })
  },

  deleteTopAlbum: (req: Request, res: Response) => {

    const { position, albumId, userId } = req.params;

    prisma.topAlbums.delete({
      //doesn't have a id like review did,
      //so our id is defined by our @unique
      //position, albumId and userId
      where: {
        position_albumId_userId: {
          position: Number(position),
          albumId: Number(albumId),
          userId: Number(userId),
        }
      }
    })
    .then((topAlbum) => {
      console.log(topAlbum)
      //SUCCESSFUL delete
      res.sendStatus(200)
    })
    .catch((error) => {
      console.error('Error deleting album:', error);
      res.sendStatus(500)
    })
  }
}