import express, { Express, Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = {
createUser: (req: Request, res: Response) => {
  /* LAST RESORT
   make req to '/profile' + use response's data to create user
   nickname -> username + name
  sub -> googleId ?
  locale ->  location
  */

  axios.get('/prisma')
    .then(data => console.log(data))
    .catch(err => console.error(err));

  // const user = prisma.user.create({
  //   data: {
  //     name: '',
  //     username: '',
  //     googleId: '',
  //     location: ''
  //   }
  // })
},

readUser: (req: Request, res: Response) => {
  
},

updateUser: (req: Request, res: Response) => {

},

deleteUser: (req: Request, res: Response) => {

}
};
