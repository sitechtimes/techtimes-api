import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env.development`});

const start = async  () => {
    if (!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined')
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Connected to mongodb")

        app.listen(3000, () => {
            console.log("Listening on port 3000");
        });

    }catch(err){
        console.log(err)
    }
}

start();
