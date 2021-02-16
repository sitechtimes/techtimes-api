import express from 'express';
import { json } from 'body-parser';
import { signupRouter } from "./routes/signup";

const app = express();
app.set('trust proxy', true);

app.use(json());

app.use(signupRouter);

export { app };
