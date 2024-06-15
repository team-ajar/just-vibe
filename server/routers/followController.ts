import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const followController = {

  followUser: (req: Request, res: Response) => {
    const { followedById, followingId } = req.params;
    prisma.follows.create({
      data: {
        followedById: parseInt(followedById),
        followingId: parseInt(followingId),
      },
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('Error following user', err);
      res.sendStatus(500);
    })
  },

  unfollowUser: (req: Request, res: Response) => {
    const { followedById, followingId } = req.params;
    prisma.follows.delete({
      where: {
        followingId_followedById: {
          followedById: parseInt(followedById),
          followingId: parseInt(followingId),
        }
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error unfollowing user', err);
      res.sendStatus(500);
    })
  },
}

export default followController;
