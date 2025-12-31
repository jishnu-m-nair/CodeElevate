import './bootstrap.js';
import express from 'express';
import router from './routes/user.route.js';
import healthRouter from './routes/health.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', healthRouter);
app.use('/', router);

export default app;
