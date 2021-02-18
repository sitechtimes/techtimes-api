import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import {User} from "../models/user";
import {validateRequest} from "../middlewares/validate-request";
import {BadRequestError} from "../errors/bad-request-error";

const router = express.Router();

router.post('/api/auth/signup',
    [
        body('email')
            .isEmail().withMessage("Email must be valid")
            .matches("^[\\w.+\\-]+@sitechhs\\.com$")
            .withMessage('Email must be a staten island tech email'),
        body('password')
            .trim()
            .isLength({min: 8, max: 16})
            .withMessage('Password must be between 8 and 16 characters')
    ], validateRequest, async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email is in use');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJWT = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJWT
    };

    res.status(201).send(user)
});

export { router as signupRouter } ;