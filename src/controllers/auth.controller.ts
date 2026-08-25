import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { hashPassword } from "../utils/bcrypt.utils";
import AppError from "../utils/appError.utils";
import sendResponse from "../utils/sendResponse.utils";



// register
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {full_name, email, password, phone_number} = req.body;
        if (!full_name) {
            // const error = new Error("full name is required");
            // error.status = "fail";
            // error.statusCode = 400;
            // error.success = false;
            // throw error;
            throw new AppError("full name is required", 400);
        }
        if (!email) {
            throw new AppError("email is required", 400);
        }
        if (!password) {
            throw new AppError("password is required", 400);
        }
        // create user instance
        const user = new User({full_name: full_name, email, phone_number, password});
        // hash password
        const hash = await hashPassword(password);
        user.password = hash;

        // upload profile image

        // save user
        await user.save();
        // convert user doc to obj and destructure
        const {password: _, ...rest} = user.toObject();

        // send success response
        sendResponse(res, {
            message: "Account Created",
            statusCode: 201,
            data: rest,
        });
    } catch (error) {
        next(error);
    }
};
// login

// change password

// forgot password

// change email

// update profile image