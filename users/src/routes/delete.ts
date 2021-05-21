import express, { Request, Response } from 'express';
import {NotAuthorizedError, requireAuth} from "@sitechtimes/shared";
import {User} from "../models/user";
import {connectToDatabase} from "../index";

const router = express.Router();

router.delete('/users/:id', requireAuth, async (req: Request, res: Response) => {
    await connectToDatabase();

    const { id } = req.params;

    if(req.currentUser!.id !== id){
        throw new NotAuthorizedError();
    }

    await User.findByIdAndDelete(id);

    res.sendStatus(204);
});

export { router as deleteUserRouter };
