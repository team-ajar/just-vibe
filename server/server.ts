import express, { Request, Response } from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const routes = require('./routers');
dotenv.config();

const app = express();

// CONSTANTS
// path to dist folder
const DIST_PATH = path.resolve(__dirname, '../dist');
// port
const PORT = 3000;
// GOOGLE CLIENT keys from .env
const GOOGLE_CLIENT_ID= process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: `http://localhost:${PORT}/`,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: 'https://dev-gxg3okgf4h43jdrx.us.auth0.com',
  secret: GOOGLE_CLIENT_SECRET
};

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));

// middleware to parse JSON bodies
app.use(bodyParser.json());

// serve client to server
app.use(express.static(DIST_PATH));

// routers
app.use('/api', routes);

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req: Request, res: Response) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  );
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req: Request, res: Response) => {

  const authUser = JSON.stringify(req.oidc.user, null, 2)
  const authUserObj = JSON.parse(authUser);

  const user = {
    username: authUserObj.nickname,
    name: authUserObj.nickname || 'new user',
    googleId: authUserObj.sub,
    location: authUserObj.locale || 'N/A',
  }

  prisma.user.create({
    data: user
  })

  res.status(200).send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(PORT, function() {
  console.log(`Listening on http://localhost:${PORT}`);
});