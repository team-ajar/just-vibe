import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const profileController = {
  readUser: (req: Request, res: Response) => {
    prisma.user
      .findMany()
      .then((found) => {
        if (found) {
          res.status(200).send(found[0]);
        } else {
          res.status(404).send("User not found");
        }
      })
      .catch(() => res.sendStatus(500));
  },

  updateUser: (req: Request, res: Response) => {
    const { userId } = req.params;

    const { updateType, updateVal } = req.body;
    if (updateType === 'name') {
      prisma.user.update({
        where: {
          id: Number(userId),
        },
        data: {
          name: updateVal
        }
      })
        .then(updUser => {
          res.status(201).send(updUser);
        })
        .catch(() => res.sendStatus(404));
    } else if (updateType === 'username') {
      prisma.user.update({
        where: {
          id: Number(userId),
        },
        data: {
          username: updateVal
        }
      })
        .then(updUser => {
          res.status(201).send(updUser);
        })
        .catch(() => res.sendStatus(404));
    }
  },

  deleteUser: (req: Request, res: Response) => {
    const { userId } = req.params;

    prisma.user.delete({
      where: {
        id: Number(userId)
      }
    })
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  },
};

export default profileController;
