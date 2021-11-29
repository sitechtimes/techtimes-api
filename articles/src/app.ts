import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import helmet from 'helmet';
import cookieSession from "cookie-session";
import cors from 'cors';

import {currentUser, errorHandler, NotFoundError} from "@sitechtimes/shared";
import {indexArticleRouter} from "./routes";
import serverless from 'serverless-http';
import {showArticleRouter} from "./routes/show";
import {homepageArticlesRouter} from "./routes/homepage";

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(helmet());
app.use(cors());

app.use(
    cookieSession({
        signed: false, // jwt is already encrypted
        secure: false, // TODO: has to be true before prod
    })
);

app.use(homepageArticlesRouter);
app.use(indexArticleRouter);
app.use(showArticleRouter);

app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const slsApp = serverless(app);
export { app, slsApp };