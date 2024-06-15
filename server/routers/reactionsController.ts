import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const reactionsController = {
  addReaction: (req: Request, res: Response) => {
    const { emoji, userId, postId } = req.body;
    console.log("Received postid:", postId);

    prisma.reaction
      .create({
        data: {
          emoji,
          userId: parseInt(userId),
          postId: Number(postId),
        },
      })
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        console.error("Error adding reaction", err);
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
};

export default reactionsController;
