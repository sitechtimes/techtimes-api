import {requireAuth} from "@sitechtimes/shared";
import express, {Request, Response} from "express";
import {Role} from "../models/role";
import {Draft} from "../models/draft";
import {ArticleStatus} from "../models/articleStatus";

const router = express.Router();

router.get('/api/cms/review/', requireAuth, async (req: Request, res: Response) => {
    let drafts = {};

    if (req.currentUser!.role == Role.Admin || Role.Editor) {
        drafts = await Draft.find({ status: ArticleStatus.Review });
    }

    res.send(drafts)
});

export { router as reviewDraftsRouter };
