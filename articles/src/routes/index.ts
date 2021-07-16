import express, { Request, Response } from 'express';
import { Article } from "../models/article";
import {connectToDatabase} from "../index";

const router = express.Router();

router.get('/articles/', async (req: Request, res: Response) => {
    await connectToDatabase();

    let query: any = {};
    let limit = 20;
    let sortBy = { updatedAt: 1 };
    let page = 1;
    let skip = 0;

    if(req.query.category) {
        query.category = req.query.category.toString();
    }

    if (req.query.q) {
        limit = Number(req.query.q);
    }

    if(req.query.sort === "dateDes") {
        sortBy = { updatedAt: -1 };
    }

    if(req.query.page) {
        page = Number(req.query.page);
        skip = page * limit;
    }

    const articles = await Article.find(query).sort(sortBy).limit(limit).skip(skip);

    res.status(200).send(articles);
});


export { router as indexArticleRouter };