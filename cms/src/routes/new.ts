import express, {Request, Response} from "express";
import {User} from "../../../users/src/models/user";
import {Article} from "../../../users/src/models/article";
import {NotFoundError, requireAuth} from "@sitechtimes/shared";

const router = express.Router();

router.post('/api/users/:id/articles', requireAuth,
    async (req: Request, res: Response) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        throw new NotFoundError();
    }

   const article = Article.build({
       title: 'Untitled',
       content: 'This is where you should write the content of your article ...'
    });

    user!.articles.push(article);

    await user!.save();

    // TODO: refactor: this is done to get the timestamps of the mongo object
    const createdArticle = user!.articles.find(userArticles => {
        return userArticles.id === article.id;
    });

    res.send(createdArticle);
});

export { router as createArticleRouter };
