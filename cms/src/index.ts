import mongoose from 'mongoose';

let cachedPromise: any = null;

export const connectToDatabase = async  () => {
    if (!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined')
    }

    if (!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined')
    }

    if (!cachedPromise) {
        cachedPromise = mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    }

    return cachedPromise
}
