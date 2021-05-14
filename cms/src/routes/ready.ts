import express, {Request, Response} from "express";
import {requireAuth, roles} from "@sitechtimes/shared";
import {Draft} from "../models/draft";
import {DraftStatus} from "../models/draftStatus";

const router = express.Router();

router.get('/api/cms/ready/', requireAuth, roles(['admin']), async (req: Request, res: Response) => {
    const drafts = await Draft.find({ status: DraftStatus.Ready });

    res.send(drafts)
});

export { router as readyDraftsRouter };