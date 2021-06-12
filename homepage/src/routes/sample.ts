import express, {Request, Response} from "express";

const router = express.Router();

router.get('/homepage/sample', async (req: Request, res: Response) => {
    res.status(201).send("hello world");
});

export { router as sampleRouter };
