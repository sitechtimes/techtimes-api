import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import {User} from "../models/user";
import {NotFoundError} from "@sitechtimes/shared";

const router = express.Router();

router.get('/api/auth/verify/:token', async (req: Request, res: Response) => {

    const { token } = req.params;

    let user = await User.findOne({ verificationCode: token });

    if (!user) {
        throw new NotFoundError();
    }

    user.verified = true
    await user.save()

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    const userJWT = jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: '6h' });

    req.session = {
        jwt: userJWT
    };

    res.status(200).send({ ...user.toJSON(), "token": userJWT });
});

export { router as verifyRouter } ;
