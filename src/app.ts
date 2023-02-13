import config from 'config';
import exp from 'constants';
import express from 'express';
import mongoose, { connect } from 'mongoose';
import { log } from './utils';


const app = express();
const port = config.get<number>("port");
const dbUri = config.get<string>("dbUri");


app.use(express.json());


app.listen(port , async ()=> {
    log.info(`health-api is running at http://localhost:${port}`);
    if (!dbUri) {
      log.error("The dbUri is not defined in the config file");
      process.exit(1);
    }
    try {
        await mongoose.connect(dbUri);
        log.info("DB Connected");
      } 
    catch (error) {
      log.error("Could not connect to db");
      process.exit(1);
    }

})


