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
        user: {
          some: {
            id: userId
          }
        }
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
export function setAlbumPosition(
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

export function findOrCreateArtist(
  name: string,
  userId: number
) {
  return prisma.artist
    .findFirst({
      where: {
        name,
        user: {
          some: {
            id: userId
          }
        },
      },
    })
    .then((artist) => {
      if (artist) {
        return artist.id;
      } else {
        return prisma.artist
          .create({
            data: {
              name,
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          })
          .then((artist) => {
            return artist.id;
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
export function setArtistPosition(
  artistId: number,
  userId: number,
  position: number
) {
  return prisma.topArtists
    .deleteMany({
      where: {
        OR: [
          {
            userId,
            artistId,
          },
          {
            userId,
            position,
          },
        ],
      },
    })
    .then(() => {
      return prisma.topArtists.create({
        data: {
          position,
          userId,
          artistId,
        },
      });
    })
    .catch((err) => {
      throw err;
    });
}
