import express from 'express';
import { json } from 'body-parser';

import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.set('trust proxy', true);

app.use(json());

app.use(signupRouter);
app.use(errorHandler)

export { app };
