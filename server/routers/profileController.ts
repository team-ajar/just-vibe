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
        console.log(found);
        if (found) {
          res.status(200).send(found);
        } else {
          res.status(404).send("User not found");
        }
      })
      .catch((err) => res.sendStatus(500));
  },

  updateUser: (req: Request, res: Response) => {},

  deleteUser: (req: Request, res: Response) => {},
};
