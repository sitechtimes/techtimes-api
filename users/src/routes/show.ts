import express, { Request, Response } from 'express';
<<<<<<< HEAD
import {NotFoundError} from "@sitechtimes/shared";
import {requireAuth} from "@sitechtimes/shared";
import {User} from "../../../auth/src/models/user";
=======
import {NotFoundError, requireAuth} from "@sitechtimes/shared";
import {User} from "../models/user";
>>>>>>> 0b5294430e96a6305491105d53ce7599d86cdf8a
import {connectToDatabase} from "../index";

const router = express.Router();

router.get('/users/:id', requireAuth, async (req: Request, res: Response) => {
    await connectToDatabase();

    const user = await User.findById(req.params.id);

    if (!user){
        throw new NotFoundError();
    }

    res.send(user);
});

export { router as showUserRouter }
