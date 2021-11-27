import express, { Request, Response } from "express";
import {currentUser} from "@sitechtimes/shared";

const router = express.Router();

router.get('/auth/current-user', currentUser, (req: Request, res: Response) => {

    res.send({...req.currentUser || {"non":"non"} });
});

export { router as currentUserRouter };