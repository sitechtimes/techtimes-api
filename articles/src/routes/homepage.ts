import express, { Request, Response } from 'express';

import { Article } from "../models/article";

const router = express.Router();

router.get('/api/homepage', async (req: Request, res: Response) => {
    //TODO: Get all articles that are marked for the homepage and mark their location on the homepage
    const homepage = await Article.find();
    
    res.status(200).send(homepage);
});

export { router as homepageRouter };
