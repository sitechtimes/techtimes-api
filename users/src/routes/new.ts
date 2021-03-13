import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {validateRequest} from "@sitechtimes/shared";
import {requireAuth} from "@sitechtimes/shared";

const router = express.Router();

// require auth should be added here ...
router.post('/api/users/', requireAuth, [
    body('title')
        .notEmpty().withMessage('Title is required'),
    body('content')
        .notEmpty().withMessage('Content is required'),
], validateRequest, async (req: Request, res: Response) => {
    const { title, content } = req.body;

    console.log(req.currentUser)

    // const article = Article.build({ title, content });
    // await a.save();

    res.status(201).send({});
});



export { router as createArticleRouter }
