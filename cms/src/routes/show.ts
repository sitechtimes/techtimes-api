import express, { Request, Response } from 'express';
import {User} from "../../../users/src/models/user";
import {NotFoundError, requireAuth} from "@sitechtimes/shared";

const router = express.Router();

// TODO : add requireAuth middleware
// requireAuth unless editor or admin
router.get('/api/users/:id/articles/:article_id', async (req: Request, res: Response) => {

    const user = await User.findById(req.params.id);

    if (!user){
        throw new NotFoundError();
    }

    const userArticles = user!.articles

    const article = userArticles.find(article => {
        return article.id === req.params.article_id;
    });

    if (!article){
        throw new NotFoundError();
    }

    res.send(article);
});

export { router as showArticleRouter }