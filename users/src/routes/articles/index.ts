import express, { Request, Response } from 'express';
import {User} from "../../models/user";
import {NotFoundError, requireAuth} from "@sitechtimes/shared";

const router = express.Router();

router.get('/api/users/:id/articles', requireAuth, async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user){
        throw new NotFoundError();
    }

    const articles = user!.articles;

    res.send(articles);
});

export { router as showArticlesRouter }
