import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from "cookie-session";

import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
    cookieSession({
        signed: false, // jwt is already encrypted
        secure: process.env.NODE_ENV !== "test"
    })
);

app.use(signupRouter);
app.use(errorHandler)

export { app };
