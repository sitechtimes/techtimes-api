import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import helmet from 'helmet';
import cookieSession from "cookie-session";
import cors from 'cors';

import {errorHandler, NotFoundError, currentUser } from "@sitechtimes/shared";
import {showArticlesRouter} from "./routes";
import {createArticleRouter} from "./routes/new";
import {updateArticleRouter} from "./routes/update";
import {showArticleRouter} from "./routes/show";
import {reviewArticlesRouter} from "./routes/review";
import {readyArticlesRouter} from "./routes/ready";

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(cors());

app.use(
    cookieSession({
        signed: false, // jwt is already encrypted
        secure: false, // TODO: has to be true before prod
    })
);

app.use(currentUser);

// app.use(showArticlesRouter);
// app.use(createArticleRouter);
// app.use(showArticleRouter);
// app.use(updateArticleRouter);
// app.use(reviewArticlesRouter);
// app.use(readyArticlesRouter);

app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler)

export { app };
