
import express, {Request, Response, NextFunction }  from "express";
import errorhandler from "./middlewares/errorHandler.middlewares";
// @types/<pkg_name>
// npm i --save-dev <pkg_name>
// npm i -D <pkg_name>

// importing routes
import authRouter from "./routes/auth.routes";
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
app.use("/api/auth",authRouter);
// path not found
app.use((req: Request, res: Response, next : NextFunction) => {
    const message = `can not ${req.method} on ${req.path}`;
    const error: any = new Error(message);
    error.statusCode = 404;
    error.status = "fail";
    error.success = false;
    next(error);
});

// error hanlder middleware
app.use(errorhandler);


export default app;