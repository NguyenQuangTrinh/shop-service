import config from 'config'
import mongoose from 'mongoose';
import { logger } from './logger';

export default async function connectDB() {
    const MONGODB_URL = config.get<string>("MONGODB_URL");

    try{
        await mongoose.connect(MONGODB_URL);
        logger.info("ConnectDB Success");
    }catch(error){
        logger.error(error);
        process.exit(1);
    }
}