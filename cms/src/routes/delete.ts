import express, { Request, Response } from 'express';
import {NotFoundError, requireAuth} from "@sitechtimes/shared";
import {Draft} from "../models/draft";

const router = express.Router();

router.delete('/api/cms/:id/', requireAuth, async (req: Request, res: Response) => {
    const draft = await Draft.findByIdAndDelete(req.params.id);
    console.log(draft)

    if (!draft) {
        throw new NotFoundError();
    }

    res.sendStatus(204);
});

export { router as deleteDraftRouter };
