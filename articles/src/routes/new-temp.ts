//Temperory for now until event-bus and CMS are hooked up. For now demos making an article, basically copied from CMS

import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {NotAuthorizedError, validateRequest} from "@sitechtimes/shared";
import {requireAuth} from "@sitechtimes/shared";

const router = express.Router();

router.post('/api/articles/new', [
    body('title')
        .notEmpty().withMessage('Title is required'),
    body('content')
        .notEmpty().withMessage('Content is required'),
], validateRequest, async (req: Request, res: Response) => {

    const { title, content } = req.body;

    res.status(201).send({ title, content});
});



export { router as createArticleRouter }
