import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import helmet from 'helmet';
import cookieSession from "cookie-session";
import cors from 'cors';
import serverless from 'serverless-http';

import {errorHandler, NotFoundError, currentUser} from "../../shared";
import {showUserRouter} from "./routes/show";
import {usersRouter} from "./routes";
import {deleteUserRouter} from "./routes/delete";
import {updateUserRouter} from "./routes/update";
import { cookie } from 'express-validator';

// import swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from '../swagger.json'

const app = express();
app.set('trust proxy', true);
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
        signed: false, // jwt is already encrypted
        secure: false // TODO: has to be true before prod
    })
)

app.use(json());
app.use(cors());

app.use(
    cookieSession({
        signed: false, // jwt is already encrypted
        secure: false, // TODO: has to be true before prod
    })
);

app.use(currentUser);

// app.use('/api/users/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(usersRouter);
app.use(showUserRouter);
app.use(deleteUserRouter);
app.use(updateUserRouter)

app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler)

const slsApp = serverless(app)

export { slsApp };
