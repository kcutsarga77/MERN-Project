import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
// register
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {full_name, email, password, phone_number} = req.body;
        if (!full_name) {
            const error = new Error("full name is required");
            error.status = "fail";
            error.statusCode = 400;
            error.success = false;
            throw error;
        }
        if (!email) {
            const error = new Error("email is required");
            error.status = "fail";
            error.statusCode = 400;
            error.success = false;
            throw error;
        }
        if (!password) {
            const error = new Error("password is required");
            error.status = "fail";
            error.statusCode = 400;
            error.success = false;
            throw error;
        }
        // create user instance
        const user = new User({full_name: full_name, email, phone_number, password});
        // hash password

        // upload profile image

        // save user
        await user.save();
        // send success response
        return res.status(201).json({
            message: "Account Created",
            success: true,
            status: "success",
            data: user
        });
    } catch (error) {
        next(error);
    }
}
// login

// change password

// forgot password

// change email

// update profile image