import express, { Request, Response } from "express";
import {currentUser} from "../../../shared";

const router = express.Router();

router.get('/auth/current-user', currentUser, (req: Request, res: Response) => {

    res.send({...req.currentUser || null });
});

export { router as currentUserRouter };
