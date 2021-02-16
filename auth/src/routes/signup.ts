import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/auth/signup', (req: Request, res: Response) => {
    res.send({"hello": "welcome"})
});

export { router as signupRouter } ;
