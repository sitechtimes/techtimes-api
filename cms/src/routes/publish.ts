import express, { Request, Response } from 'express';
import {requireAuth} from "@sitechtimes/shared";

const router = express.Router();

router.get('/api/cms/:id/publish', requireAuth, async (req: Request, res: Response) => {
    // TODO: build out the publish route
    res.send(200)
});


export { router as publishRouter };
