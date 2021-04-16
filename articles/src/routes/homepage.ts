import express, { Request, Response } from 'express';
import {validateRequest, BadRequestError} from "@sitechtimes/shared";
import queryscript from 'queryscript';
import { app } from '../app';
import { check } from 'express-validator';

import { Article } from "../models/article-temp";

const router = express.Router();
//app.use(queryscript);


router.get('/api/homepage', async (req: Request, res: Response) => {
    let Homepage = await Article.find();
    
    res.status(200).send(Homepage);
});