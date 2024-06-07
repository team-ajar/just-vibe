import express, { Express, Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

module.exports = {
  // createUser: (req: Request, res: Response) => {},

  readUser: (req: Request, res: Response) => {
    prisma.user
      .findMany()
      .then((found) => {
        // console.log(found);
        if (found) {
          res.status(200).send(found[0]);
        } else {
          res.status(404).send("User not found");
        }
      })
      .catch((err) => res.sendStatus(500));
  },

  updateUser: (req: Request, res: Response) => {
    const { userId } = req.params;

    const { updateType, updateVal } = req.body;
    // update type can be either name (for now), username (?), or location (?)
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
          console.log(updUser);
          res.status(201).send(updUser);
        })
        .catch(err => res.sendStatus(404));

    }
  },

  deleteUser: (req: Request, res: Response) => {
    const { userId } = req.params;

    prisma.user.delete({
      where: {
        id: Number(userId)
      }
    })
      .then(data => res.sendStatus(201))
      .catch(err => res.sendStatus(500));
  },
};
