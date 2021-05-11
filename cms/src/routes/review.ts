import {requireAuth, roles} from "@sitechtimes/shared";
import express, {Request, Response} from "express";
import {Draft, DraftDoc} from "../models/draft";
import {DraftStatus} from "../models/draftStatus";

const router = express.Router();

router.get('/api/cms/review/', requireAuth, roles(['editor','admin']), async (req: Request, res: Response) => {
    let drafts = await Draft.find({ status: DraftStatus.Review });

    res.send(drafts)
});

export { router as reviewDraftsRouter };
