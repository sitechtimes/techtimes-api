import { Request, Response, NextFunction } from 'express';
import {NotAuthorizedError} from "..";

export const roles = (roles: Array<any>) => (req: Request, res: Response, next: NextFunction) => {

    let authorized = false;

    roles.forEach(role => {
        if (!authorized) {
            authorized = req.currentUser!.role === role;
        }
    });

    if (!authorized){
        throw new NotAuthorizedError();
    }

    next();
};
