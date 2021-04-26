import express, { Request, Response } from 'express';
import {validateRequest, BadRequestError} from "@sitechtimes/shared";
import queryscript from 'queryscript';
import { app } from '../app';
import { check } from 'express-validator';

import { Article } from "../models/article-temp";

const router = express.Router();
//app.use(queryscript);


router.get('/api/articles', async (req: Request, res: Response) => {
    //Default values!! Pretty sure this part is totally unneccessary besides defining the variables since I declare most of the values later... but meh for now.
    let topic = "";
    let limit = 20;
    let query = "";
    let page = 0;
    let sort_method = {};

    //If the topic or query is not undefined it will become equal to the query for the topic or query respectively
    if(req.query.topic !== undefined) { topic = String(req.query.topic); }
    if(req.query.query !== undefined) { query = String(req.query.query); }

    //If q (which represents the limit when typed into the query) is not undefined and if it is a number and above 0 it will alter the limit to the value of q.
    if (req.query.q === undefined) { limit = 20;} 
    else if(Number(req.query.q) > 0) {  limit = Number(req.query.q);}
    else{ throw new BadRequestError('This is not a valid limit');}
    //If page (which represents the page number when typed into the query) is not undefined and if it is a number and above 0 it will alter the page to that value.
    if (req.query.page === undefined) { page = 0} 
    else if(Number(req.query.page) > -1) {  page = Number(req.query.page);}
    else{ throw new BadRequestError('This is not a valid page');}

    //Housekeeping, had to convert them this way so that you could sort them, the extra variables are annoying, Maybe I'll find a way to simplify it later?
    let qe = new RegExp(`\\b${query}\\b`, 'gi');
    let top = new RegExp(`\\b${topic}\\b`, 'gi');

    //Pretty sure this could be shorter, but it works and looks fine for now. Based on what query it gets for method it'll create an object that sorts by said parameter
    if (req.query.method === undefined) {  sort_method = {createdAt: 1}; }
    else if(req.query.method === "alphasc") { //Sorting alphabet ascending (A-Z)  
        sort_method = {title: 1};
    }
    else if(req.query.method === "alphdesc") { //Sorting alphabet descending (Z-A)
        sort_method = {title: -1};
    }
    else if(req.query.method === "crDateAsc"){ //Sort by the Creation Date ascending (Newest to Oldest)
        sort_method = {createdAt: 1};
    }
    else if(req.query.method === "crDateDesc") {//Sort by the Creation Date descending (Oldest to Newest)
        sort_method = {createdAt: -1};
    }
    else if(req.query.method === "upDateAsc"){//sort by the Updated Date ascending (Newest to Oldest)
        sort_method = {updatedAt: 1};
    }
    else if(req.query.method === "upDateDesc") {//Sort by the Updated Date descending (Oldest to Newest)
        sort_method = {updatedAt: -1};
    }
    else {  //Defaults to Newest and Oldest
        sort_method = {createdAt: 1};
    }

    //Basically it checks for all Articles that match the queries. The default setting with no query is:
    //content = "", topic = "", page = 0, sort_method = {createdAt: 1}, limit = 20;
    let Articles = await Article.find({ content: qe , topic: top }, null, { skip: page*limit, sort: sort_method}).limit(limit).exec();

    //Going to remove the [topic, limit, query, page] since they were just for testing purposes to make sure the queries were getting saved properly etc
    res.status(200).send([[topic, limit, query, page], Articles]);
});


export { router as sampleArticleRouter }