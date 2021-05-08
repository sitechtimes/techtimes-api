import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import helmet from 'helmet';
import cookieSession from "cookie-session";
import cors from 'cors';

import {errorHandler, NotFoundError, currentUser } from "@sitechtimes/shared";
import {createDraftRouter} from "./routes/new";
import {showDraftRouter} from "./routes/show";
import {indexDraftRouter} from "./routes";
import {updateDraftRouter} from "./routes/update";
import {readyDraftsRouter} from "./routes/ready";
import {reviewDraftsRouter} from "./routes/review";
import {deleteDraftRouter} from "./routes/delete";
import {publishDraftRouter} from "./routes/publish";

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

app.use(readyDraftsRouter);
app.use(reviewDraftsRouter);
app.use(indexDraftRouter);
app.use(createDraftRouter);
app.use(showDraftRouter);
app.use(updateDraftRouter);
app.use(deleteDraftRouter);
app.use(publishDraftRouter);

app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler)

export { app };
