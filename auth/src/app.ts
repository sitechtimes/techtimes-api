import express, { Request, Response } from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import helmet from 'helmet';
import cookieSession from "cookie-session";

import {errorHandler, NotFoundError } from "@sitechtimes/shared";
import {signupRouter} from "./routes/signup";
import {signinRouter} from "./routes/signin";
import {currentUserRouter} from "./routes/current-user";
import {signoutRouter} from "./routes/signout";

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(helmet());

app.use(
    cookieSession({
        signed: false, // jwt is already encrypted
        secure: false // TODO: has to be true before prod
    })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(signoutRouter);


app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler)

export { app };
