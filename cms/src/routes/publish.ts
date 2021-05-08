import express, { Request, Response } from 'express';
import {NotFoundError, requireAuth} from "@sitechtimes/shared";
import {Draft} from "../models/draft";
import {Article} from "../models/article";
// import {User} from "../../../users/src/models/user";

const router = express.Router();

// TODO: build out the publish route
router.get('/api/cms/:id/publish', requireAuth, async (req: Request, res: Response) => {
    const draft = await Draft.findById(req.params.id);

    if (!draft){
       throw new NotFoundError();
    }

    // const draftUser = await User.findById(draft.userId);
    //
    // if (!draftUser){
    //     throw new NotFoundError();
    // }
    //

    // const article = Article.build({
    //     title: draft.title,
    //     content: draft.content,
    //     imageUrl: draft.imageUrl,
    //     user: {
    //         id: draft.userId,
    //         name: draftUser.name,
    //         imageUrl: draftUser.imageUrl
    //     }
    // })

    // await article.save()

    res.sendStatus(200);
});


export { router as publishDraftRouter };
