import './bootstrap.js';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { env } from './config/env.config.js';
import cookieParser from 'cookie-parser';
import router from './routes/index.route.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const URLArray = [env.FRONTEND_URL, env.FRONTEND_URL2] as string[];
app.use(cookieParser());

app.use(
  cors({
    origin: URLArray,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

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

app.use('/api/v1', router);

app.use(errorHandler);

export default app;
