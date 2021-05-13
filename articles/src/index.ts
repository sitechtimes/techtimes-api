import { app } from "./app";
import mongoose from 'mongoose';

//Classic Index
const start = async  () => {
    //Define the hidden variables in a dotenv file and make sure to keep them hidden!

    //Checks for hidden variables used to encode Json Webtokens
    if (!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined')
    }
    //Checks for hidden variables for the link to the Mongo database being used
    if (!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined')
    }

    //Forms a connection to the database using the link provided
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
