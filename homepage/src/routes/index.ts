import express, {Request, Response} from "express";
import {connectToDatabase} from "../index";
import {Homepage} from "../models/homepage";

const router = express.Router();

router.get('/homepage/', async (req: Request, res: Response) => {
    await connectToDatabase();

    const homepages = await Homepage.find({});

    res.send(homepages);
});

export { router as indexHomepageRouter };
