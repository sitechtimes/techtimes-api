import express, { Request, Response } from 'express';
import {requireAuth} from "@sitechtimes/shared";
import {Draft} from "../models/draft";

const router = express.Router();

router.get('/api/cms/', requireAuth, async (req: Request, res: Response) => {
    const drafts = await Draft.find({ userId: req.currentUser!.id });

    res.send(drafts);
});

export { router as indexDraftRouter };
