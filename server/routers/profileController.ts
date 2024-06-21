import { Request, Response } from "express";
interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}
declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const profileController = {
  readUser: (req: Request<{ user: User }>, res: Response) => {

    if (req.user && req.user.id) {
      prisma.user
        .findUnique({
          where: {
            id: Number(req.user.id),
          }
        })
        .then((found) => {
          if (found) {
            res.status(200).send(found);
          } else {
            res.status(404).send("User not found");
          }
        })
        .catch(() => res.sendStatus(500));
    }
  },

  updateUser: (req: Request, res: Response) => {
    const { userId } = req.params;

    const { username, name, bio } = req.body;

    prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        username,
        name,
        bio
      }
    })
      .then((updUser: User) => res.status(201).send(updUser))
      .catch(() => res.sendStatus(500));
  },

  deleteUser: (req: Request, res: Response) => {
    const { userId, gooId } = req.params;

    prisma.user.delete({
        where: {
          googleId: gooId
        },
      })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  },
};

export default profileController;
