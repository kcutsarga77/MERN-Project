import { Request, Response, NextFunction } from "express";
import ENV_CONFIG from "../config/env.config";
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
            details: error?.details ?? null,
            stack: ENV_CONFIG.NODE_ENV === "development" ? error?.stack : null
        });
};

export default errorhandler;