import express, { Request, Response } from 'express';
import {User} from "../../models/user";
import {NotFoundError, requireAuth} from "@sitechtimes/shared";

const router = express.Router();

// TODO: update article - admin and editor should be able to access
router.put('/api/users/:id/articles/:article_id', requireAuth, async (req: Request, res: Response) => {

    const user = await User.findById(req.params.id);

    if (!user){
        throw new NotFoundError();
    }

    // better way to find articles directly on model
    const userArticles = user!.articles

    const article = userArticles.find(article => {
        return article.id === req.params.article_id;
    });

    if (!article){
        throw new NotFoundError();
    }

    res.send(article);
});

export { router as updateArticleRouter }