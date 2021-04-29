import express, { Request, Response } from 'express';
import {NotFoundError, requireAuth} from "@sitechtimes/shared";
import {Draft} from "../models/draft";

const router = express.Router();

// TODO : add admin, editor, and writer of draft access only middleware
router.get('/api/cms/:id', requireAuth, async (req: Request, res: Response) => {

    const draft = await Draft.findById(req.params.id);

    if (!draft) {
        throw new NotFoundError();
    }

    res.send(draft)
});

export { router as showDraftRouter }