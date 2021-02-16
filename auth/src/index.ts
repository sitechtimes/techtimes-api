import express from 'express';
import { json } from 'body-parser';

const app = express();
app.set('trust proxy', true);

app.use(json());

app.get('/', (req, res) => {
    res.send({})
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

export { app };
