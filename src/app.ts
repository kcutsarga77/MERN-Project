import express, {Request, Response, NextFunction }  from "express";
import errorhandler from "./middlewares/errorHandler.middleware";
import AppError from "./utils/appError.utils";
// @types/<pkg_name>
// npm i --save-dev <pkg_name>
// npm i -D <pkg_name>

// importing routes
import routes from "./routes";

const app = express();


// middleawres
app.use(express.json());

//health check route
app.get("/",(req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "server is up and running!",
        
        status: "success",
        success: true,
        data: null
    });
});

// using routes
app.use("/api/v1", routes);

// path not found
app.use((req: Request, res: Response, next : NextFunction) => {
    const message = `can not ${req.method} on ${req.path}`;
    next(new AppError(message, 404));
});

// error hanlder middleware
app.use(errorhandler);


export default app;