import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const followedUsers = {
  getFollowedUsersReviews: (req: Request, res: Response) => {
    const { userId } = req.params;

    prisma.follows
      .findMany({
        where: { followedById: parseInt(userId) },
        include: {
          following: {
            include: {
              reviews: {
                include: {
                  Album: true,
                },
              },
            },
          },
        },
      })
      .then((follows: any) => {
        const reviews = follows.flatMap(
          (follow: {
            following: {
              username: any;
              reviews: any;
            };
          }) =>
            follow.following.reviews.map((review: any) => ({
              ...review,
              username: follow.following.username,
              album: review.Album,
            }))
        );
        res.status(200).send(reviews);
      })
      .catch((err) => {
        console.error("Error fetching followed users reviews", err);
        res.sendStatus(500);
      });
  },
};

export default followedUsers;
