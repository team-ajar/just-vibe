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
    const { albumName, artistId, artist } = req.body;

    prisma.artist.findFirst({ where: { name: artist}})
    .then(firstUser => {
      console.log(firstUser);
      if (firstUser) {
        prisma.album.create({
          data: {
            name: albumName,
            artistId: firstUser.id,
          }
        })
          .then(data => console.log(data))
          .catch(err => console.log(err));
      } else {
        return;
      }
    })
    .catch(err => console.log(err));
    // save album to db
    // prisma.album.create({
    //   data:{
    //     name: albumName,
    //     artistId: artistId,
    //   }
    // })
    //   .then((data: any) => console.log(data))
    //   .catch((err: any) => console.log(err));
  },

}