import { catchAsync } from "../utils/catchAsync.utils";
import Category from "../models/category.model";
import sendResponse from "../utils/sendResponse.utils";
import AppError from "../utils/appError.utils";

// get all
export const getAll = catchAsync(async(req, res) => {
    const filter = {};

    const categories = await Category.find(filter);

    // send success response
    sendResponse(res, {
        message: "categories fetched",
        data: categories,
        statusCode: 200
    });
});

// get by id
export const getById = catchAsync(async(req, res) => {
    const {id} = req.params;
    const category = await Category.findOne({_id: id});

    if(!category) throw new AppError("category not found", 404);

    // send success response
    sendResponse(res, {
        message: "category fetched",
        data: category,
        statusCode: 200
    });
});

// create

// update

// delete