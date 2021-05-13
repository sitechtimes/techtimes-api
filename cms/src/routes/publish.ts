import express, { Request, Response } from 'express';
import {NotFoundError, requireAuth, roles} from "@sitechtimes/shared";
import {Draft} from "../models/draft";
import {Article} from "../models/article";
import mongoose from "mongoose";

const router = express.Router();

router.post('/api/cms/:id/publish', requireAuth, roles(['admin']), async (req: Request, res: Response) => {

    const draft = await Draft.findById(req.params.id);

    if (!draft){
       throw new NotFoundError();
    }

    const db = mongoose.connection.db.collection('users')

    const users = await db.find({_id: mongoose.Types.ObjectId(draft.userId)}).toArray();

    if (!users[0]){
        throw new NotFoundError();
    }

    const article = Article.build({
        title: draft.title,
        content: draft.content,
        imageUrl: draft.imageUrl,
        category: draft.category,
        user: {
            id: draft.userId,
            name: users[0].name,
            imageUrl: users[0].imageUrl
        }
    });

    await article.save();
    await Draft.findByIdAndDelete(req.params.id);

    res.sendStatus(200);
});


export { router as publishDraftRouter };
