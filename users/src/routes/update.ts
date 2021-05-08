import express, { Request, Response } from 'express';
import {NotFoundError} from "@sitechtimes/shared";
import {requireAuth} from "@sitechtimes/shared";
import {User} from "../models/user";

const router = express.Router();

// TODO: route should be update to allow admin to change user's role
router.put('/api/users/:id', requireAuth, async (req: Request, res: Response) => {
    const { imageUrl, role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user){
        throw new NotFoundError();
    }

    const image = imageUrl === undefined ? user.imageUrl : imageUrl;
    const updatedRole = role === undefined ? user.role : role;

    user.set({ imageUrl: image, role: updatedRole });

    await user.save();

    res.send(user);
});

export { router as updateUserRouter };
