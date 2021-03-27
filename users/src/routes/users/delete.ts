import express, { Request, Response } from 'express';
import {requireAuth} from "@sitechtimes/shared";
import {User} from "../../models/user";

const router = express.Router();

router.delete('/api/users/:id', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(req.params.id);

    res.status(204).send({});
});

export { router as deleteUserRouter };
