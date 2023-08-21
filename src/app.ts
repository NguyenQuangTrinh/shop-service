import express from 'express';
import config from 'config';
import connectDB from './utils/connectDB';
import { logger } from './utils/logger';
import routers from './routes';
import deserilizeUser from './middleware/deserializeUser';
import cors from 'cors'


const app = express();
const PORT = config.get<number>('PORT');


var corsOptions = {
    origin: '*',
  }

app.use(express.json());
app.use(deserilizeUser);
app.use(cors(corsOptions));

app.listen(PORT, async () => {
    logger.info(`App is running at ${PORT}`);

    await connectDB();
    routers(app);
})