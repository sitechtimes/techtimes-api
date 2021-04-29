import express, { Request, Response } from 'express';
import {NotFoundError, requireAuth} from "@sitechtimes/shared";
import {Role} from "../models/role";
import {ArticleStatus} from "../models/articleStatus";
import {Draft} from "../models/draft";

const router = express.Router();

router.put('/api/cms/:id/', requireAuth, async (req: Request, res: Response) => {
    const draft = await Draft.findById(req.params.id);

    if (!draft){
        throw new NotFoundError();
    }

    // draft - for writer
    // TODO - refactor update logic
    if (draft.userId == req.currentUser!.id) {
        const title = req.body.title == undefined ? draft.title : req.body.title
        const content = req.body.content == undefined ? draft.content : req.body.content
        const status = req.body.status == ArticleStatus.Review ? req.body.status : draft.status

        draft.set({ title, content, status });
    }

    // // editor - can move to ready and back to draft
    if (req.currentUser!.role == Role.Editor && draft.status == 'review') {
        if (req.body.status == ArticleStatus.Ready || ArticleStatus.Draft) {
            draft.set({
                status: req.body.status
            });
        }
    }

    // admin
    // if (user!.role == Role.Editor) {
    //     if (req.body.status == ArticleStatus.Draft) {
    //         article.set({
    //             status: req.body.status,
    //         });
    //     }
    // }

    await draft.save();

    res.send(draft);
});

export { router as updateDraftRouter };
