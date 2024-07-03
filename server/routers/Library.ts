import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function findOrCreateAlbum(
  albumName: string,
  artistName: string,
  image: string,
  userId: number
) {
  return prisma.album
    .findFirst({
      where: {
        albumName,
        artistName,
        image,
        userId: Number(userId),
      },
    })
    .then((album) => {
      if (album) {
        return album.id;
      } else {
        return prisma.album
          .create({
            data: {
              albumName,
              artistName,
              image,
              userId,
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          })
          .then((album) => {
            return album.id;
          })
          .catch((err) => {
            throw err;
          });
      }
    })
    .catch((err) => {
      throw err;
    });

}
export function setAbumPosition(
  albumId: number,
  userId: number,
  position: number
) {
  return prisma.topAlbums
    .deleteMany({
      where: {
        OR: [
          {
            userId,
            albumId,
          },
          {
            userId,
            position,
          },
        ],
      },
    })
    .then(() => {
      return prisma.topAlbums.create({
        data: {
          position,
          userId,
          albumId,
        },
      });
    })
    .catch((err) => {
      throw err;
    });
}
