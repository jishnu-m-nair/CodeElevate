import './bootstrap.js';
import express from 'express';
import session from 'express-session';
import router from './routes/user.route.js';
import healthRouter from './routes/health.route.js';
import { env } from './config/env.config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: 'codeelevate.sid',
    secret: env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: env.SESSION_MAX_AGE,
    },
  }),
);

app.use('/', healthRouter);
app.use('/', router);

export default app;
