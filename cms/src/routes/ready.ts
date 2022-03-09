import express, {Request, Response} from "express";
import {requireAuth, roles} from "@sitechtimes/shared";
import {Draft} from "../models/draft";
import {DraftStatus} from "../models/draftStatus";
import {connectToDatabase} from "../index";
import {Username} from "../services/username";

const router = express.Router();

router.get('/cms/ready/', requireAuth, roles(['admin']), async (req: Request, res: Response) => {
    await connectToDatabase();

    const drafts = await Draft.find({ status: DraftStatus.Ready });

    await Username.findUserNames(drafts)

    res.send(drafts)
});

export { router as readyDraftsRouter };
