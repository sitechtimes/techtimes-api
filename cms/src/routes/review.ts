import {requireAuth} from "@sitechtimes/shared";
import express, {Request, Response} from "express";
import {Role} from "../models/role";
import {Draft, DraftDoc} from "../models/draft";
import {DraftStatus} from "../models/draftStatus";

const router = express.Router();

router.get('/api/cms/review/', requireAuth, async (req: Request, res: Response) => {
    // TODO: article doesn't below to them ...

    let drafts: Array<DraftDoc> = [];

    if (req.currentUser!.role == Role.Admin || Role.Editor) {
        drafts = await Draft.find({ status: DraftStatus.Review });
    }

    res.send(drafts)
});

export { router as reviewDraftsRouter };
