import express, { Request, Response } from 'express';
import {NotFoundError} from "@sitechtimes/shared";
import {requireAuth} from "@sitechtimes/shared";
import {User} from "../models/user";

const router =express.Router();

router.get('/api/users/:id', requireAuth, async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user){
        throw new NotFoundError();
    }

    res.send(user);
});



export { router as createArticleRouter }
