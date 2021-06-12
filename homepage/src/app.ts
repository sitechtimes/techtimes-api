import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from "cookie-session";
import cors from 'cors';
import serverless from 'serverless-http';

import {errorHandler, NotFoundError, currentUser } from "@sitechtimes/shared";
import {sampleRouter} from "./routes/sample";

// import swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from '../swagger.json'

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

// app.use(currentUser);

// app.use('/cms/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(sampleRouter);


app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler)

const slsApp = serverless(app);
export { slsApp };
