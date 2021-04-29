import express, { Request, Response } from 'express';
import {NotAuthorizedError} from "@sitechtimes/shared";
import {Role} from "../models/role";
import {User} from "../models/user";

const router =express.Router();

router.get('/api/users/', async (req: Request, res: Response) => {

    // TODO: create middleware for role auth
    if(req.currentUser!.role != "admin"){
        throw new NotAuthorizedError();
    }

    const users = await User.find({ role: { $ne: Role.Admin }});

    res.send(users);
});

export { router as usersRouter }