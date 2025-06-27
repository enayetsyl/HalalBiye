import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000', 'https://halal-biye.vercel.app'], credentials: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Halal Biye Server');
});

export default app;