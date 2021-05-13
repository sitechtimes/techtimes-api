import express, { Request, Response } from 'express';
import {NotAuthorizedError, requireAuth, roles} from "@sitechtimes/shared";
import {Role} from "../models/role";
import {User} from "../models/user";

const router = express.Router();

router.get('/api/users/', requireAuth, roles(['admin']), async (req: Request, res: Response) => {
    const users = await User.find({ role: { $ne: Role.Admin }});

    res.send(users);
});

export { router as usersRouter };