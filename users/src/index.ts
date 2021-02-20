import express, { Request, Response } from 'express';
import 'express-async-errors';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send({});
});

app.listen(3001, () => {
    console.log("Listening on port 3001");
});