import express, {Request, Response} from "express";
import {requireAuth} from "@sitechtimes/shared";
import {Draft, DraftDoc} from "../models/draft";
import {Role} from "../models/role";
import {DraftStatus} from "../models/draftStatus";

const router = express.Router();

router.get('/api/cms/ready/', requireAuth, async (req: Request, res: Response) => {
    let drafts: Array<DraftDoc> = [];

    if (req.currentUser!.role == Role.Admin) {
        drafts = await Draft.find({ status: DraftStatus.Ready });
    }

    res.send(drafts)
});

export { router as readyDraftsRouter };