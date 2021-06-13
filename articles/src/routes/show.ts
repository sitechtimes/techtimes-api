import express, { Request, Response } from 'express';
import { Article } from "../models/article";
import {connectToDatabase} from "../index";
import {NotFoundError} from "@sitechtimes/shared";

const router = express.Router();

router.get('/articles/:slug', async (req: Request, res: Response) => {
    await connectToDatabase();

    const { slug } = req.params;

    const article = await Article.findOne({ slug });

    if (!article){
        throw new NotFoundError();
    }

    res.status(200).send(article);
});


export { router as showArticleRouter };