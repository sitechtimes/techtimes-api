import express from 'express';
import { json } from 'body-parser';
import { signupRouter } from "./routes/signup";

const app = express();
app.set('trust proxy', true);

app.use(json());

app.use(signupRouter);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

export { app };
