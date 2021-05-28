import express, { Request, Response } from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cors from 'cors';
import cookieSession from "cookie-session";
import serverless from 'serverless-http'

import {errorHandler, NotFoundError } from "@sitechtimes/shared";
import {signupRouter} from "./routes/signup";
import {signinRouter} from "./routes/signin";
import {currentUserRouter} from "./routes/current-user";
import {signoutRouter} from "./routes/signout";
import {verifyRouter} from "./routes/verify";

// import swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from '../swagger.json'

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(cors());

app.use(
    cookieSession({
        signed: false, // jwt is already encrypted
        secure: false // TODO: has to be true before prod
    })
);

// app.use('/api/auth/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(verifyRouter);


app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler)

const slsApp = serverless(app);

export { slsApp };
