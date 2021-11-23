import express, { Request, Response } from 'express';
import jwt, {decode} from 'jsonwebtoken';

import {User} from "../models/user";
import {BadRequestError, NotFoundError} from "@sitechtimes/shared";
import {connectToDatabase} from "../index";

const router = express.Router();

router.get('/auth/verify/:token', async (req: Request, res: Response) => {
    await connectToDatabase();

    const { token } = req.params;

    let user = await User.findOne({ verificationCode: token });

    if (!user) {
        throw new NotFoundError();
    }

    const d: any = decode(token);

    if (Date.now() > d.exp * 1000) {
        throw new BadRequestError('Token is not valid')
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