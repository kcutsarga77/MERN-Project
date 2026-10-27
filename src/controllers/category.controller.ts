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
export const create = catchAsync(async (req, res) => {
    const {name, description} = req.body;

    const category = new Category({name, description});

    // upload image
    
    // save category
    await category.save();
    sendResponse(res,{
        message: `catregory: ${category.name} created`,
        statusCode: 201,
        data: category,

    })
});
// update
export const update = catchAsync(async (req, res) => {
    
});

// delete
export const remove = catchAsync(async (req, res) => {
    
});