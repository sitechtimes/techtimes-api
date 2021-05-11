import express, {Request, Response} from "express";
import {Draft} from "../models/draft";
import {requireAuth} from "@sitechtimes/shared";

const router = express.Router();

router.post('/api/cms/', requireAuth, async (req: Request, res: Response) => {

   const draft = Draft.build({
       title: 'Untitled',
       content: 'This is where you should write the content of your article ...',
       userId: req.currentUser!.id
    });

   await draft.save()

   res.status(201).send(draft);
});

export { router as createDraftRouter };
