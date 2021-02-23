import { app } from "./app";
import mongoose from 'mongoose';
import env from 'dotenv';

env.config({ path: `${__dirname}/../../.env.development`});

const start = async  () => {
    if (!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined')
    }

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

        app.listen(3001, () => {
            console.log("Listening on port 3001");
        });

    }catch(err){
        console.log(err)
    }
}

start();
