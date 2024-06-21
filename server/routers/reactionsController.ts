import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const reactionsController = {
  addOrUpdateReaction: (req: Request, res: Response) => {
    const { emoji, userId, postId } = req.body;

    prisma.reaction
      .findFirst({
        where: {
          userId: parseInt(userId),
          postId: parseInt(postId),
        },
      })
      .then((existingReaction) => {
        if (existingReaction) {
          return prisma.reaction.update({
            where: {
              id: existingReaction.id,
            },
            data: {
              emoji,
            },
          });
        } else {
          return prisma.reaction.create({
            data: {
              emoji,
              userId: parseInt(userId),
              postId: Number(postId),
            },
          });
        }
      })
      .then((updatedReaction) => {
        if (updatedReaction) {
          res.status(updatedReaction ? 200 : 201).send(updatedReaction);
        } else {
          res.sendStatus(500);
        }
      })
      .catch((err) => {
        console.error("Error adding/updating reaction:", err);
        res.sendStatus(500);
      });
  },

  removeReaction: (req: Request, res: Response) => {
    const { userId, postId } = req.params;
    prisma.reaction
      .deleteMany({
        where: {
          userId: parseInt(userId),
          postId: parseInt(postId),
        },
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error("Error removing reaction", err);
        res.sendStatus(500);
      });
  },

  getReaction: (req: Request, res: Response) => {
    const { userId, postId } = req.params;

    prisma.reaction.findFirst({
      where: {
        userId: parseInt(userId),
        postId: parseInt(postId),
      },
    })
    .then((reaction) => {
      res.status(200).send(reaction);
    })
    .catch((err) => {
      console.error("Error fetching reaction:", err);
      res.sendStatus(500);
    });
  }
};

export default reactionsController;
