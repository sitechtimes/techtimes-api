import express, { Request, Response } from 'express';
import {NotAuthorizedError, requireAuth} from "@sitechtimes/shared";
import {User} from "../models/user";

const router = express.Router();

router.delete('/api/users/:id', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params;

    if (req.currentUser!.id !== id) {
        throw new NotAuthorizedError();
    }

    await User.findByIdAndDelete(id);

    res.sendStatus(204);
});

export { router as deleteUserRouter };
