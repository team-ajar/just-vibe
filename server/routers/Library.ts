import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
/**
 * export this helper function to find or create a album, for a specific user
 */
//data needed to find or create album
export function findOrCreateAlbum(
  albumName: string,
  artistName: string,
  image: string,
  userId: number
) {
  //first try to find THE specific album
  //in the database on the album table
  return prisma.album.findFirst({
      where: {
        albumName,
        artistName,
        userId: Number(userId),
      },
    })
    .then((album) => {
      //IF album is found, return that specific album identification
      if (album) {
        // the album.id is used to write  a review
        return album.id;
      } else {
        //if the album isn't found, create the album inside the database then return the album identifier
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
            //return the created album id
            return album.id;
            //since its not in the database, we need to correctly change the frontend search results
            //and remove the saveAlbum button
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