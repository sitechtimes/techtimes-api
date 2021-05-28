import express, { Request, Response } from 'express';
import {NotAuthorizedError, NotFoundError} from "@sitechtimes/shared";
import {requireAuth} from "@sitechtimes/shared";
import {User} from "../models/user";
import {Role} from "../models/role";
import {connectToDatabase} from "../index";

const router = express.Router();

router.put('/users/:id', requireAuth, async (req: Request, res: Response) => {
    await connectToDatabase();

    const { imageUrl, role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user){
        throw new NotFoundError();
    }

    if (user.id !== req.currentUser!.id && req.currentUser!.role !== Role.Admin ) {
        throw new NotAuthorizedError();
    }

    if (user.id === req.currentUser!.id) {
        const image = imageUrl === undefined ? user.imageUrl : imageUrl;
        user.set({ imageUrl: image });
    }

    if (req.currentUser!.role === Role.Admin) {
        const updatedRole = role === undefined ? user.role : role;
        user.set({ role: updatedRole });
    }

    await user.save();

    res.send(user);
});

export { router as updateUserRouter };
