import express, { Express, Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = {
  saveAlbum: (req: Request, res: Response) => {
    const { name, releaseDate, artistId} = req.body;

    // save album to db
    prisma.album.create({
      data: {
        name,
        releaseDate,
        artistId
      }
    })
      .then((data: any) => console.log(data))
      .catch((err: any) => console.log(err));
  },

  saveArtist: (req: Request, res: Response) => {
    const { artistName } = req.body;

    prisma.artist.create({
      data: {
        name: artistName,
        description: 'N/A'
      }
    })
      .then((data: any) => console.log(data))
      .catch((err: any) => console.log(err));
  },
}