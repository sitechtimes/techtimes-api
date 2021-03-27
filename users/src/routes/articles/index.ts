import express, { Request, Response } from 'express';
import {User} from "../../models/user";

const router = express.Router();

// TODO: should get articles of users
router.get('/api/users/:id/articles', async (req: Request, res: Response) => {

    const user = await User.findById(req.params.id);

    res.send(user);
});

export { router as showArticlesRouter }
