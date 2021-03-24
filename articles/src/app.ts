import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import helmet from 'helmet';
import cookieSession from "cookie-session";

import {errorHandler, NotFoundError, currentUser } from "@sitechtimes/shared";
import {sampleArticleRouter} from "./routes/articles";

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(helmet());

app.use(
    cookieSession({
        signed: false, // jwt is already encrypted
        secure: false, // TODO: has to be true before prod
    })
);

app.use(sampleArticleRouter);

app.use(currentUser);

app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);



export { app };
