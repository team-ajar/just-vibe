import express, { Request, Response} from 'express';
require('dotenv').config();
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient();

const topThreeController = {
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

  createOrUpdateTopAlbum: (req: Request, res: Response) => {
    const { position, oldAlbumId, userId } = req.params;
    const { newAlbumId } = req.body;

   

    //if the album doesnt exist, we pass 0 as the oldAlbumId, to know we need to creare it

    if (oldAlbumId === '0'){
      prisma.topAlbums.create({
        data: {
          position: Number(position),
          albumId: Number(newAlbumId),
          userId: Number(userId),
        },
      })
      //after creating it if it doesnt exist, we send the response to the front end
      .then((topAlbum) => {
        res.status(201).json(topAlbum);
      })
      .catch((error) => {
        // console.error('Error creating album:', error);
        res.sendStatus(500);

      })
      //return is here, because after the promise is either successfully fulfilled or not, execution will stop
      //after the then or catch
      return

    }

    prisma.topAlbums.update({
      where: {
        position_albumId_userId: {
          position: Number(position),
          albumId: Number(oldAlbumId),
          userId: Number(userId), 
        }
      },
      data: {
        //we want to update the albumId in the sql table, with the NEW albumId
        albumId: Number(newAlbumId)
      }
    })
    .then((topAlbum) => {
      res.status(200).json(topAlbum)
    })
    .catch((error) => {
      // console.error('Error updating album:', error)
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
      //SUCCESSFUL delete
      res.sendStatus(200)
    })
    .catch((error) => {
      console.error('Error deleting album:', error);
      res.sendStatus(500)
    })
  },
  ////////////////////////////////////// NOW ARTISTS ////////////////
  getTopArtists: (req: Request, res: Response) => {
    let { userId } = req.params;
    const userIdNumber = Number(userId);

    if (userIdNumber < 0){
      return res.sendStatus(400);
    }
    
    prisma.artist.findMany({
      orderBy: {
        name: 'asc' //put in order alphabetically with 'asc' over 'desc'
      }
    })
    //we have all albums from the schemas
    .then((artists) => {
      prisma.topArtists.findMany({
        where: {
          userId: Number(userId)
        },
        orderBy: {
          position: 'asc'
        }
      })
      //after we have all topAlbums for the user
      .then((topArtists) => {
        res.status(200).json({artists, topArtists})
      })
    })
    .catch((error) => {
      //handle any error in the topAlbums retrieval
      console.error('Error retrieving albums:', error)
      res.sendStatus(500)
    })
  },

  createOrUpdateTopArtist: (req: Request, res: Response) => {
    const { position, oldArtistId, userId } = req.params;
    const { newArtistId } = req.body;

   

    //if the album doesnt exist, we pass 0 as the oldAlbumId, to know we need to creare it

    if (oldArtistId === '0'){
      prisma.topArtists.create({
        data: {
          position: Number(position),
          artistId: Number(newArtistId),
          userId: Number(userId),
        },
      })
      //after creating it if it doesnt exist, we send the response to the front end
      .then((topArtist) => {
        res.status(201).json(topArtist);
      })
      .catch((error) => {
        // console.error('Error creating album:', error);
        res.sendStatus(500);

      })
      //return is here, because after the promise is either successfully fulfilled or not, execution will stop
      //after the then or catch
      return

    }

    prisma.topArtists.update({
      where: {
        position_artistId_userId: {
          position: Number(position),
          artistId: Number(oldArtistId),
          userId: Number(userId), 
        }
      },
      data: {
        //we want to update the albumId in the sql table, with the NEW albumId
        artistId: Number(newArtistId)
      }
    })
    .then((topArtist) => {
      res.status(200).json(topArtist)
    })
    .catch((error) => {
      // console.error('Error updating album:', error)
      res.sendStatus(500);
    })
  },

  deleteTopArtist: (req: Request, res: Response) => {
    
    const { position, artistId, userId } = req.params;

    prisma.topArtists.delete({
      //doesn't have a id like review did,
      //so our id is defined by our @unique
      //position, artistId and userId
      //position, userId, artistId for request
      where: {
        position_artistId_userId: {
          position: Number(position),
          artistId: Number(artistId),
          userId: Number(userId),
        }
      }
    })
    .then((topArtist) => {
      //SUCCESSFUL delete
      res.sendStatus(200)
    })
    .catch((error) => {
      console.error('Error deleting album:', error);
      res.sendStatus(500)
    })
  },
}

export default topThreeController;
