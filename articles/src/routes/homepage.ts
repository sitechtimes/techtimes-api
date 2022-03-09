import express, {Request, Response} from "express";
import {connectToDatabase} from "../index";
// import {Homepage} from "../models/homepage";
import { Article } from "../models/article";

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

    // const homepages = await Homepage.find(query);
    const homepages = await Article.find(query);
    res.send(homepages);
});

export { router as homepageArticlesRouter };
