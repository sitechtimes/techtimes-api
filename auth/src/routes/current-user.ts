import express, { Request, Response } from "express";
import {currentUser} from "@sitechtimes/shared";

const router = express.Router();

router.get('/api/auth/current-user',
    currentUser, (req: Request, res: Response) => {
    console.log(req.currentUser);

    res.send({...req.currentUser || null });
});

export { router as currentUserRouter };
