import { Request, Response, NextFunction } from "express";

const errorhandler = (
    error: any,
     _: Request,  /* "_" is used for unused parameters */
     res: Response, 
     __: NextFunction
    ) =>{   
        const message = error?.message ?? "something went wrong";
        const statusCode = error?.statusCode ?? 500;
        const status = error?.status ?? "error";
        const success = error?.success ?? false;

        // send error response
        res.status(statusCode).json({
            message,
            status,
            success,
            data: null,
            stack: error?.stack ?? null
        });
};

export default errorhandler;