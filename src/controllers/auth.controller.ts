import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import AppError from "../utils/appError.utils";
import sendResponse from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";



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
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        if (!email) throw new AppError("email is required", 400);
        if (!password) throw new AppError("password is required", 400);

        // find by email
        const user = await User.findOne({email}).select("+password");
        if (!user) throw new AppError("email or password doesn't match", 400);

        // compare password
        const isPasswordMatched = await comparePassword(password, user.password);
        if (!isPasswordMatched) throw new AppError("email or password doesn't match", 400);

        //todo:  create jwt access token
        
        // convert user doc to obj and destructure
        const {password: _, ...rest} = user.toObject();

        // send success response
        sendResponse(res, {
            message: "Login success",
            statusCode: 201,
            data: rest,
        });
    } catch (error) {
        next(error);
    }
};
// change password
export const changePassword = catchAsync(async(req,res) => {
    const {old_password, new_password, id} = req.body;
    if (!new_password) throw new AppError("new password is required", 400);
    if (!old_password) throw new AppError("old password is required", 400);

    const user = await User.findById(id).select("+password");
    if (!user) throw new AppError("user not found", 400);

    const isPasswordMatched = await comparePassword(old_password, user?.password);
    if (!isPasswordMatched) throw new AppError("password doesn't match", 400);

    const hash = await hashPassword(new_password);
    user.password = hash;

    await user.save();

    sendResponse(res, {
        message: "Password updated",
        data: null,
        statusCode: 200
    });
})

// forgot password

// change email

// update profile image