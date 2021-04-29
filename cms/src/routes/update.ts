import express, { Request, Response } from 'express';
import {User} from "../../../users/src/models/user";
import {NotFoundError, requireAuth, validateRequest} from "@sitechtimes/shared";
import {Role} from "../../../users/src/models/role";
import {ArticleStatus} from "../../../users/src/models/articleStatus";

const router = express.Router();

router.put('/api/users/:id/articles/:article_id',
    validateRequest, requireAuth, async (req: Request, res: Response) => {
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

    // TODO: major refactor with checks - add more error handling
    if (user.role == Role.Writer && article.status == 'draft') {

        const title = req.body.title == undefined ? article.title : req.body.title
        const content = req.body.content == undefined ? article.content : req.body.content
        const status = req.body.status == ArticleStatus.Review ? req.body.status : article.status

        article.set({ title, content, status });
    }

    // editor - can move to ready and back to draft
    if (user!.role == Role.Editor && article.status == 'review') {
        if (req.body.status == ArticleStatus.Ready || ArticleStatus.Draft) {
            article.set({
                status: req.body.status
            });
        }
    }

    // admin
    //
    // if (user!.role == Role.Editor) {
    //     if (req.body.status == ArticleStatus.Draft) {
    //         article.set({
    //             status: req.body.status,
    //         });
    //     }
    // }

    await user.save();

    // TODO: send article back to user
    res.sendStatus(204);
});

export { router as updateArticleRouter }
