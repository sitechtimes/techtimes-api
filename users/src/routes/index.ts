import express, { Request, Response } from 'express';
import {NotAuthorizedError, requireAuth, roles} from "@sitechtimes/shared";
import {Role} from "../models/role";
import {User} from "../../../auth/src/models/user";
import {connectToDatabase} from "../index";

const router = express.Router();

router.get('/users/', requireAuth, roles(['admin']), async (req: Request, res: Response) => {
    await connectToDatabase();

    const users = await User.find({ role: { $ne: Role.Admin }});

    res.send(users);
});

export { router as usersRouter };