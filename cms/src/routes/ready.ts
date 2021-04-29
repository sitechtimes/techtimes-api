import express, {Request, Response} from "express";
import {requireAuth} from "@sitechtimes/shared";
import {Draft} from "../models/draft";
import {Role} from "../models/role";
import {ArticleStatus} from "../models/articleStatus";

const router = express.Router();

router.get('/api/cms/ready/', requireAuth, async (req: Request, res: Response) => {
    let drafts = {};

    if (req.currentUser!.role == Role.Admin) {
        drafts = await Draft.find({ status: ArticleStatus.Ready });
    }

    res.send(drafts)
});

export { router as readyDraftsRouter };