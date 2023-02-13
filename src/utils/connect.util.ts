import config from 'config';
import mongoose from 'mongoose';
import { log } from './logger.util';

export async function connect () {
    const dbUri = config.get<string>("dbUri");
    if (!dbUri) {
      log.error("The dbUri is not defined in the config file");
      process.exit(1);
  }
    try {
        mongoose.connect(dbUri);
        log.info("DB Connected");
      } 
    catch (error) {
      log.error("Could not connect to db");
      process.exit(1);
    }
}