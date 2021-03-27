import express, {Request, Response} from "express";
import {User} from "../../models/user";
import {Article} from "../../models/article";
import {NotFoundError, requireAuth, validateRequest} from "@sitechtimes/shared";
import {body} from "express-validator";

const router = express.Router();

router.post('/api/users/:id/articles', requireAuth,
    [
        body('title')
            .not().isEmpty().withMessage('Title is required'),
        body('content')
            .not().isEmpty().withMessage('Content is required')
    ],
    validateRequest, async (req: Request, res: Response) => {

    const { title, content } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
        throw new NotFoundError();
    }

    const article = Article.build({
        title, content
    });

    user!.articles.push(article);

    await user!.save()

    res.send(user);
});

export { router as createArticleRouter };
