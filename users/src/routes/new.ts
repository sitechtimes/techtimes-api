import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {NotAuthorizedError, validateRequest} from "@sitechtimes/shared";
import {requireAuth} from "@sitechtimes/shared";

const router = express.Router();

router.post('/api/cms', requireAuth, [
    body('title')
        .notEmpty().withMessage('Title is required'),
    body('content')
        .notEmpty().withMessage('Content is required'),
], validateRequest, async (req: Request, res: Response) => {

    const { title, content } = req.body;

    res.status(201).send({});
});



export { router as createArticleRouter }
