import express, {Request, Response} from "express";
import {connectToDatabase} from "../index";
import {Homepage} from "../models/homepage";

const router = express.Router();

router.get('/articles/homepage', async (req: Request, res: Response) => {
    await connectToDatabase();

    const query: any = {};

    if(req.query.category){
        query.category = req.query.category.toString();
    }

    if(req.query.position){
        query.position = req.query.position.toString();
    }

    const homepages = await Homepage.find(query);
    res.send(homepages);
});

export { router as homepageArticlesRouter };
