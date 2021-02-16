import express, { Request, Response } from 'express';
import { body } from 'express-validator';

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
    ], (req: Request, res: Response) => {

    const { email, password } = req.body;
    console.log(email, password, router);
});

export { router as signupRouter } ;
