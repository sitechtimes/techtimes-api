import express, {Request, Response} from "express";
import {Category} from "../models/category";

const router = express.Router();

router.get('/cms/categories', async (req: Request, res: Response) => {
    const categories = Object.values(Category);

    res.status(200).send(categories);
});

export { router as categoriesRouter };
