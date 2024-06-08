import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

module.exports = {
  saveArtist: (req: Request, res: Response) => {
    const { artistName } = req.body;
    
    prisma.artist.create({
      data: {
        name: artistName,
        description: 'N/A'
      }
    })
      .then((data: any) => res.sendStatus(201))
      .catch((err: any) => res.sendStatus(500));
  },
  saveAlbum: (req: Request, res: Response) => {
    const { albumName, artistName, image }: { albumName: string, artistName: string, image: string} = req.body;

    prisma.album.create({
      data: {
        albumName,
        artistName,
        image,
      }
    })
    .then((data: any) => res.sendStatus(201))
    .catch((err: any) => res.sendStatus(500));
  },
  readAlbums: (req: Request, res: Response) => {
    prisma.album.findMany()
      .then(albums => res.status(201).send(albums))
      .catch(err => res.sendStatus(500));
  }
}