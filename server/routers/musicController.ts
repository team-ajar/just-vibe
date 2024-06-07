import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

module.exports = {
  saveArtist: (req: Request, res: Response) => {
    const { artistName } = req.body;

    prisma.artist.findFirst({
      where: { name: artistName }
    })
      .then((existingArtist) => {
        if (existingArtist) {
          console.log('Artist already exists', existingArtist);
          res.sendStatus(404);
        } else {
          // save artist to db
          return prisma.artist.create({
            data: {
              name: artistName,
              description: 'N/A'
            }
          })
            .then(() => {
              res.sendStatus(201);
            })
            .catch((err) => {
              console.error('Error saving artist', err);
              res.sendStatus(500);
            });
        }
      })
      .catch((err) => {
        console.error('Error finding artist', err);
        res.sendStatus(500);
      });
  },

  saveAlbum: (req: Request, res: Response) => {
    const { albumName, artistId } = req.body;

    prisma.album.findFirst({
      where: { name: albumName }
    })
      .then((existingAlbum) => {
        if (existingAlbum) {
          console.log('Album already exists', existingAlbum);
          res.sendStatus(404);
        } else {
          // save album to db
          prisma.album.create({
            data: {
              name: albumName,
              artistId: artistId,
            }
          })
            .then(() => {
              res.sendStatus(201);
            })
            .catch((err) => {
              console.error('Error saving album', err);
              res.sendStatus(500);
            });
        }
      })
      .catch((err) => {
        console.error('Error finding album', err);
        res.sendStatus(500);
      });
  },
}