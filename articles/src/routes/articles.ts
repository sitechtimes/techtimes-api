import express, { Request, Response } from 'express';
import {validateRequest, BadRequestError} from "@sitechtimes/shared";

import { Article } from "../models/article";

const router = express.Router();

router.get('/api/articles', async (req: Request, res: Response) => {

    let cat = "";
    let limit = 20;
    let sortBy = { updatedAt: 1 };

    if(req.query.cat) {
        cat = req.query.cat.toString();
    }

    if (req.query.q) {
        limit = Number(req.query.q);
    }

    if(req.query.sort === "dateDes") {
        sortBy = { updatedAt: -1 };
    }

    const articles = await Article.find({ category: cat }).sort(sortBy).limit(limit);

    res.status(200).send(articles);
});


export { router as articleRouter };