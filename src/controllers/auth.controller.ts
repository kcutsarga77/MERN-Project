import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import AppError from "../utils/appError.utils";
import sendResponse from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { generateJwtToken } from "../utils/jwt.utils";
import { date } from "zod";
import ENV_CONFIG from "../config/env.config";



// register
export const register = catchAsync(async (req, res) => {
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
});

// login
export const login = catchAsync(async(req, res) => {
    const {email, password} = req.body;
        // if (!email) throw new AppError("email is required", 400);
        // if (!password) throw new AppError("password is required", 400);  // validation done through middleawre

        // find by email
        const user = await User.findOne({email}).select("+password");
        if (!user) throw new AppError("email or password doesn't match", 400);

        // compare password
        const isPasswordMatched = await comparePassword(password, user.password);
        if (!isPasswordMatched) throw new AppError("email or password doesn't match", 400);

        //todo:  create jwt access token
        const access_token = generateJwtToken({_id: user._id, email: user.email, role: user.role});

        
        // convert user doc to obj and destructure
        const {password: _, ...rest} = user.toObject();

        // set cookie header
        res.cookie("access_token", access_token,{
            secure: ENV_CONFIG.NODE_ENV === "development" ? false : true,
            httpOnly: ENV_CONFIG.NODE_ENV === "development" ? false : true,
            expires: new Date(Date.now() + ENV_CONFIG.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            sameSite: ENV_CONFIG.NODE_ENV === "development" ? "lax": 'none'
        });

        // send success response
        sendResponse(res, {
            message: "Login success",
            statusCode: 201,
            data: {
                user:rest,
                access_token
            },
        });
});
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