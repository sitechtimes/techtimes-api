import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import helmet from 'helmet';
import cookieSession from "cookie-session";

import {errorHandler, NotFoundError, currentUser } from "@sitechtimes/shared";
import {showUserRouter} from "./routes/users/show";
import {usersRouter} from "./routes/users";
import {deleteUserRouter} from "./routes/users/delete";
import {showArticlesRouter} from "./routes/articles";
import {createArticleRouter} from "./routes/articles/new";
import {updateArticleRouter} from "./routes/articles/update";

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

app.use(currentUser);

app.use(usersRouter);
app.use(showUserRouter);
app.use(deleteUserRouter);

app.use(showArticlesRouter);
app.use(createArticleRouter);
app.use(updateArticleRouter);

app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler)

export { app };
