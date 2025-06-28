import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';


const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000', 'https://halal-biye.vercel.app'], credentials: true }));

// application routes
app.use('/api/v1', router);  


app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Halal Biye Server');
});

app.use(globalErrorHandler);  

//Not Found
app.use(notFound);

export default app;