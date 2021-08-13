import express, { Request, Response } from 'express';
import {NotAuthorizedError, NotFoundError, requireAuth} from "@sitechtimes/shared";
import {Draft} from "../models/draft";
import {Role} from "../models/role";
import {connectToDatabase} from "../index";

const router = express.Router();

router.get('/cms/:id', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params;

    await connectToDatabase();

    const draft = await Draft.findById(id);

    if (!draft) {
        throw new NotFoundError();
    }

    if (draft.userId !== req.currentUser!.id && req.currentUser!.role === Role.Writer) {
        throw new NotAuthorizedError();
    }

    res.send(draft);
});

export { router as showDraftRouter };