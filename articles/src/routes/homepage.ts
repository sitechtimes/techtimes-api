import express, { Request, Response } from 'express';
import {validateRequest, BadRequestError} from "@sitechtimes/shared";
import queryscript from 'queryscript';
import { app } from '../app';
import { check } from 'express-validator';

import { Article } from "../models/article-temp";

const router = express.Router();
//app.use(queryscript);

//Waiting for instructions/planning on what to do here from Group Leader
router.get('/api/homepage', async (req: Request, res: Response) => {
    //Currently just returns all articles
    //TODO: Get all articles that are marked for the homepage and mark their location on the homepage
    let Homepage = await Article.find();
    
    res.status(200).send(Homepage);
});