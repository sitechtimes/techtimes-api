import express, { Request, Response } from 'express';
import {requireAuth} from "../../../shared";
import {Draft} from "../models/draft";
import {connectToDatabase} from "../index";

const router = express.Router();

router.get('/cms/', requireAuth, async (req: Request, res: Response) => {
    await connectToDatabase();

    const drafts = await Draft.find({ userId: req.currentUser!.id });

    res.send(drafts);
});

export { router as indexDraftRouter };
