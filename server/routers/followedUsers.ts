import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const followedUsers = {
  getFollowedUsersReviews: (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { username: true },
    });

    const followedUsersReviews = prisma.follows.findMany({
      where: { followedById: parseInt(userId) },
      include: {
        following: {
          include: {
            reviews: {
              include: {
                Album: true,
              },
              orderBy: {
                id: 'desc',
              }
            },
          },
        },
      },
    });

    const userReviews = prisma.review.findMany({
      where: { userId: parseInt(userId) },
      include: { Album: true },
      orderBy: { id: 'desc' },
    });

    Promise.all([user, followedUsersReviews, userReviews])
      .then(([user, follows, userReviews]) => {
        const followedReviews = follows.flatMap(
          (follow) => follow.following.reviews.map((review) => ({
            ...review,
            username: follow.following.username,
            album: review.Album,
          }))
        );

        const ownReviews = userReviews.map((review) => ({
          ...review,
          username: user?.username || "You",
          album: review.Album,
        }));

        const allReviews = [...ownReviews, ...followedReviews].sort((a, b) => b.id - a.id);
        res.status(200).send(allReviews);
      })
      .catch((err) => {
        console.error("Error fetching followed users and own reviews", err);
        res.sendStatus(500);
      });
  },
};

export default followedUsers;
