import express, { Request, Response } from 'express';
import {BadRequestError, CustomError, NotAuthorizedError, NotFoundError, requireAuth} from "@sitechtimes/shared";
import {Role} from "../models/role";
import {DraftStatus} from "../models/draftStatus";
import {Draft} from "../models/draft";
import {connectToDatabase} from "../index";
import sanitize from "sanitize-html";

const router = express.Router();

router.put('/cms/:id/', requireAuth, async (req: Request, res: Response) => {
    await connectToDatabase();

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
        const title = req.body.title == undefined ? draft.title : sanitize(req.body.title)

        if (title.length > 75){
            throw new BadRequestError('Title must be longer than 75 characters');
        }

        const content = req.body.content == undefined ? draft.content : sanitize(req.body.content)

        const status = req.body.status == DraftStatus.Review ? req.body.status : draft.status
        const imageUrl = req.body.imageUrl == undefined ? draft.imageUrl : req.body.imageUrl
        const category = req.body.category == undefined ? draft.category : req.body.category

        const imageAlt = req.body.imageAlt == undefined ? draft.imageAlt : req.body.imageAlt

        draft.set({ title, content, status, imageUrl, imageAlt, category });
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
