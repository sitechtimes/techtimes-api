import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from "cookie-session";

import {errorHandler} from "./middlewares/error-handler";
import {signupRouter} from "./routes/signup";
import {signinRouter} from "./routes/signin";
import {currentUserRouter} from "./routes/current-user";

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
app.use(signinRouter);
app.use(currentUserRouter);

app.use(errorHandler)

export { app };
