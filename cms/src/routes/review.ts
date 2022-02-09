import {requireAuth, roles} from "@sitechtimes/shared"
import express, {Request, Response} from "express";
import {Draft} from "../models/draft";
import {DraftStatus} from "../models/draftStatus";
import {connectToDatabase} from "../index";
import {Username} from "../services/username";

const router = express.Router();

router.get('/cms/review/', requireAuth, roles(['editor', 'admin']), async (req: Request, res: Response) => {
    await connectToDatabase();

    const drafts = await Draft.find({ status: DraftStatus.Review });

    await Username.findUserNames(drafts)

    res.send(drafts);
});

export { router as reviewDraftsRouter };
