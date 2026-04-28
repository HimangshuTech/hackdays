import "dotenv/config";
import express from 'express';
import router from './routes/index';
import cookieParser from 'cookie-parser';

import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/', router);

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

export default app;
