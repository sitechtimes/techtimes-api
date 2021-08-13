import express, { Request, Response } from 'express';
import {NotFoundError, requireAuth, NotAuthorizedError} from "@sitechtimes/shared";
import {Draft} from "../models/draft";
import {connectToDatabase} from "../index";

const router = express.Router();

router.delete('/cms/:id/', requireAuth, async (req: Request, res: Response) => {
    await connectToDatabase();

    const draft = await Draft.findByIdAndDelete(req.params.id);

    if (!draft) {
        throw new NotFoundError();
    }

    if(draft.userId !== req.currentUser!.id) {
       throw new NotAuthorizedError();
    }

    res.sendStatus(204);
});

export { router as deleteDraftRouter };
