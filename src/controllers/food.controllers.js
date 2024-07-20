import { FoodModel } from "../models/food.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);

const addFood = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;

    if ([name, description, price, category].some((field) => !field?.trim())) {
      throw new ApiError(400, "All fields are required");
    }

    const imageFileName = req.file ? req.file.filename : "";

    if (!imageFileName) {
      throw new ApiError(400, "Image is required");
    }

    const newFoodItem = new FoodModel({
      name,
      description,
      price,
      category,
      image: imageFileName
    });

    const foodItemAdded = await newFoodItem.save();

    return res.status(201).json(new ApiResponse(200, "Food item added successfully", foodItemAdded));
  } catch (error) {
    next(new ApiError(500, error.message || "Can't add new food item"));
  }
};

const listFood = async (req, res, next) => {
  try {
    const foods = await FoodModel.find({});
    return res.status(201).json(new ApiResponse(200, foods, "Data fetched successfully"));
  } catch (error) {
    next(new ApiError(500, error.message || "Can't fetch food items successfully"));
  }
};

const removeFood = async (req, res, next) => {
  try {
    const food = await FoodModel.findById(req.body.id);
    if (!food) {
      throw new ApiError(404, "Food item not found");
    }

    await unlinkAsync(`./public/${food.image}`);
    await FoodModel.findByIdAndDelete(req.body.id);

    return res.status(200).json(new ApiResponse(200, food, "Food item deleted successfully"));
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || "Unable to delete food item"));
  }
};

export { 
  addFood,
  listFood,
  removeFood 
};
