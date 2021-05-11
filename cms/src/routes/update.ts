import express, { Request, Response } from 'express';
import {NotAuthorizedError, NotFoundError, requireAuth} from "@sitechtimes/shared";
import {Role} from "../models/role";
import {DraftStatus} from "../models/draftStatus";
import {Draft} from "../models/draft";

const router = express.Router();

router.put('/api/cms/:id/', requireAuth, async (req: Request, res: Response) => {
    const draft = await Draft.findById(req.params.id);

    if (!draft){
        throw new NotFoundError();
    }

    if (draft.userId !== req.currentUser!.id && req.currentUser!.role === Role.Writer ) {
        throw new NotAuthorizedError();
    }

    // draft - for writer
    if (draft.userId == req.currentUser!.id) {
        // TODO - refactor update logic
        const title = req.body.title == undefined ? draft.title : req.body.title
        const content = req.body.content == undefined ? draft.content : req.body.content
        const status = req.body.status == DraftStatus.Review ? req.body.status : draft.status
        const imageUrl = req.body.imageUrl == undefined ? draft.imageUrl : req.body.imageUrl
        const category = req.body.category == undefined ? draft.category : req.body.category

        draft.set({ title, content, status, imageUrl, category });
    }

    // editor - can move to ready and back to draft
    if (req.currentUser!.role == Role.Editor || req.currentUser!.role == Role.Admin && draft.status == DraftStatus.Review) {
        if (req.body.status == DraftStatus.Ready || DraftStatus.Draft) {
            draft.set({
                status: req.body.status
            });
        }
    }

    // admin
    if (req.currentUser!.role == Role.Admin && draft.status == DraftStatus.Ready) {
        if (req.body.status == DraftStatus.Draft) {
            draft.set({
                status: req.body.status
            });
        }
    }

    await draft.save();

    res.send(draft);
});

export { router as updateDraftRouter };