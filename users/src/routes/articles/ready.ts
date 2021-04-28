import express, { Request, Response } from 'express';
import {User} from "../../models/user";
import {requireAuth, validateRequest} from "@sitechtimes/shared";
import {Role} from "../../models/role";
import {ArticleStatus} from "../../models/articleStatus";
import {ArticleDoc} from "../../models/article";

const router = express.Router();

router.get('/api/users/articles/ready',
    validateRequest, requireAuth, async (req: Request, res: Response) => {

    // TODO: create middleware for admin, editor, writer check
    if (req.currentUser!.role == Role.Admin){

        const users = await User.find({});

        let articles: Array<ArticleDoc> = [];

        users.forEach(user => {
            user.articles.forEach(article => {
                if (article.status == ArticleStatus.Ready) {
                    articles.push(article);
                }
            });
        });

        res.send({ 'articles': articles });

    }else{
        res.send({});
    }

});

export { router as readyArticlesRouter };
