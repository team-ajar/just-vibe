import express, { Express, Request, Response } from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
import path from 'path';
const app: Express = express();
import dotenv from 'dotenv';
dotenv.config();

// CONSTANTS
// path to dist folder
// const DIST_PATH = path.resolve(__dirname, '..', 'client/dist');
// port
// const PORT = 8000;
// GOOGLE CLIENT keys from .env
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const config = {
  authRequired: true,
  auth0Logout: true,
  baseURL: 'http://localhost:3000/',
  clientID: GOOGLE_CLIENT_ID,
  issuerBaseURL: 'https://dev-gxg3okgf4h43jdrx.us.auth0.com',
  secret: GOOGLE_CLIENT_SECRET
};

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));

// serve client to server
app.use(express.static(path.join(__dirname, '../dist')));
// routers
// app.use('/api', routes);

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  )
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});